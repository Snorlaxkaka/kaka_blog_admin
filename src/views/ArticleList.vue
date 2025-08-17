<template>
  <div>
    <m-top-handle
      title="标题"
      content="写博客"
      path="/articles/create/"
    ></m-top-handle>
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
        <template scope="scope">
          {{ scope.row.createdAt | date('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="最后更新时间">
        <template scope="scope">
          {{ scope.row.updatedAt | date('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="remove(scope.row._id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 添加分页控件 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
       // 添加分页相关变量
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
  async fetch() {
      // 修改请求URL，添加分页参数
      const res = await this.$http.get(`rest/articles?page=${this.currentPage}&limit=${this.pageSize}`)
      this.items = res.data.items
      // 更新分页信息
      this.total = res.data.pagination.total
    },
    // 添加分页事件处理函数
    handleSizeChange(val) {
      this.pageSize = val
      this.fetch()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetch()
    },
    remove(id) {
      this.$confirm('是否确定要删除这篇文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await this.$http.delete(`rest/articles/${id}`)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          await this.fetch()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
  created() {
    this.fetch()
  },
}
</script>



<style scoped>
/* 添加分页样式 */
.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style>