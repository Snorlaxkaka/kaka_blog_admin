/*
 * @Author: linjunjie 129569154+Snorlaxkaka@users.noreply.github.com
 * @Date: 2024-12-10 13:54:19
 * @LastEditors: linjunjie 129569154+Snorlaxkaka@users.noreply.github.com
 * @LastEditTime: 2025-08-08 17:54:56
 * @FilePath: \kaka_blog_admin\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  devServer: {
    port: 8088,
    // 关闭主机检查，避免局域网内其他设备无法访问
    disableHostCheck: true,
  },
  outputDir: 'dist',
  publicPath: '/',
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CleanWebpackPlugin(),
        ],
      }
    } else {
      // 开发环境下的额外配置
    }
    // 路径别名配置
    config.resolve = {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
}
