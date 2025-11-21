'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    port: 9001,
    //  public:
    //    require('os').networkInterfaces()[
    //      Object.keys(require('os').networkInterfaces())[0]
    //    ][1].address + ':8888',
    disableHostCheck: true,
  },
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('~assets', resolve('src/assets'))
      // .set('~theme', resolve('src/styles/dark-green'))
      .set('~theme', resolve('src/styles/theme'))
      .set('~components', resolve('src/components'))
      .set('~public', resolve('public'))
  },
}
