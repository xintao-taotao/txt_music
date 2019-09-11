const path = require('path');
const BaseUrl = require("./config/config");

function resolve(dir) {
  return path.join(__dirname, dir)
}
// 项目的主要配置文件
module.exports = {
  // webpack 配置进行更细粒度的修改  https://cli.vuejs.org/zh/config/#chainwebpack
  chainWebpack: (config) => {
    //修改文件引入自定义路径
    config.resolve.alias
      .set('views', resolve('./src/views'))
      .set('utils', resolve('./src/utils'))
      .set('api', resolve('./src/api'))
  },
  productionSourceMap: false,
  devServer: {
    proxy: {
      [BaseUrl.ROOT]: {
        target: BaseUrl.URL, // 通过本地服务器将你的请求转发到这个地址
        changeOrigin: true, // 设置这个参数可以避免跨域
        pathRewrite: {
          [`^${BaseUrl.ROOT}`]: "/"
        }
      }
    }
  }
}