const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "https://hadassahmary.github.io/CST3145-Afterschool/" : "/",
})
