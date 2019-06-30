const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist'
  },
  devServer: {
    overlay: true
  }
}