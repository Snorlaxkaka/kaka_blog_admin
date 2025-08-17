import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000
})

// 请求拦截器：添加 token
http.interceptors.request.use(
  function (config) {
    // 检查 localStorage 中是否存在 token
    if (localStorage.getItem('token')) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器：处理错误
http.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    // 增加对 err.response 的存在性判断
    if (err.response) {
      // 处理有响应的错误
      if (err.response.data && err.response.data.message) {
        Vue.prototype.$message({
          type: 'error',
          message: err.response.data.message,
        })
      } else {
        // 当没有具体错误信息时的默认提示
        Vue.prototype.$message({
          type: 'error',
          message: '请求发生错误',
        })
      }

      // 处理 401 未授权错误
      if (err.response.status === 401) {
        // 清除无效 token
        localStorage.removeItem('token')
        router.push('/login')
      }
    } else {
      // 处理无响应的错误（如网络错误）
      Vue.prototype.$message({
        type: 'error',
        message: '网络错误，请检查网络连接',
      })
    }

    return Promise.reject(err)
  }
)

export default http