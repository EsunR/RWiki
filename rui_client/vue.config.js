const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = {
  outputDir: path.resolve(__dirname, '../rui_serve/static'),
  configureWebpack: {
    resolve: {
      alias: {
        "@com": resolve('./src/components')
      }
    }
  }
}