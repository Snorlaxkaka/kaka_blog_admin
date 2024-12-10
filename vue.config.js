// vue.config.json
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  devServer: {
    port: 8088,
  },
  outputDir: 'dist',
  publicPath: '/kaka_blog_web/',
  //publicPath: process.env.NODE_ENV === 'production' ? '/admin/': '/',
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      return {
        plugins: [
          new CleanWebpackPlugin(),
        ],
      }
    } else {
      // 为开发环境修改配置...

    }
    // 添加路径别名
    config.resolve = {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
}
