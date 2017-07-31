const webpack = require('webpack')
const pkg = require('../package.json')
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `${pkg.name}.js`,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['blue'],
          babelrc: false
        }
      }
    ]
  }
}
