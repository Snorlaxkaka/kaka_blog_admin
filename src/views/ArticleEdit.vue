<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="(res) => $set(model, 'icon', res.url)"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 仅编辑时显示时间选择器 -->
      <el-form-item label="创建时间" v-if="id">
        <el-date-picker
          v-model="model.createdAt"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-ddTHH:mm:ss"
          placeholder="选择创建时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" v-if="id">
        <el-date-picker
          v-model="model.updatedAt"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-ddTHH:mm:ss"
          placeholder="选择更新时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="详情">
        <div>
          <mavon-editor
            code_style="monokai-sublime"
            :ishljs="true"
            ref="mavon"
            v-model="model.body"
            @imgAdd="$imgAdd"
          ></mavon-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'Create',
  components: {
    mavonEditor,
  },
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      categories: [],
      body: '',
    }
  },
  methods: {
    async save() {
      // 新建时移除时间字段（防止意外提交）
      const submitData = { ...this.model }
      if (!this.id) {
        delete submitData.createdAt
        delete submitData.updatedAt
      }

      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, submitData)
      } else {
        await this.$http.post('rest/articles', submitData)
      }
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功',
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    async fetchCategories() {
      const res = await this.$http.get('rest/categories')
      this.categories = res.data
    },
    $imgAdd(pos, $file) {
      const formData = new FormData()
      formData.append('file', $file)
      this.$http.post('upload', formData).then((res) => {
        this.$refs.mavon.$img2Url(pos, res.data.url)
      })
    },
  },
  created() {
    this.fetchCategories()
    this.id && this.fetch()
  },
}
</script>