
var webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
       {
         loader:  "css-loader",
       },
       {
        loader:  "sass-loader",
      }
      ]
    },{
      test: /\.scss$/,
      use: [
        "style-loader",
        MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
      ]
    }]
  },
  devServer: {
    overlay: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template:'index.html'
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
}),
  ]
}