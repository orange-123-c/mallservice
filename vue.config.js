const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 修改为相对路径，支持本地文件打开
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  
  // 以下是你原有配置
  transpileDependencies: true,
  lintOnSave: false // 关闭语法检查
})