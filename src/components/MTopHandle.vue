<!--
 * @Author: linjunjie 129569154+Snorlaxkaka@users.noreply.github.com
 * @Date: 2024-12-10 13:54:19
 * @LastEditors: linjunjie 129569154+Snorlaxkaka@users.noreply.github.com
 * @LastEditTime: 2025-08-07 21:52:15
 * @FilePath: \kaka_blog_admin\src\components\MTopHandle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="top-box">
      <strong>{{ title }}：</strong>
      <el-input
        class="search-input"
        :placeholder="placeholderText"
        v-model="searchName"
      ></el-input>
      <el-button type="primary">搜索</el-button>
      <template v-if="path && content">
        <el-button type="primary" class="fr" @click="$router.push(path)">
          {{ content }}
        </el-button>
      </template>
      <slot name="email"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '名称',
    },
    content: String,
    path: String,
  },
  data() {
    return {
      searchName: '',
      placeholderText: '',
    };
  },
  created() {
    this.placeholderText = `请输入${this.title}`;
  },
};
</script>

<style lang="scss" scoped>
.top-box {
  margin-bottom: 30px;
  .search-input {
    width: 300px;
    margin-right: 10px;
  }
  .fr {
    float: right;
  }
}
</style>