const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 保留相对路径 ./
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  
  transpileDependencies: true,
  lintOnSave: false // 关闭语法检查
})