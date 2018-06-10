const path = require('path')
const pkg = require('./package.json')
const webpack = require('webpack')
const Compression = require('brotli-gzip-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${pkg.name}.js`,
    libraryTarget: 'umd',
    library: 'VueAnalytics'
  },
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'src/lib'),
      directives: path.resolve(__dirname, 'src/directives')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'hash:[hash]'
    }),
    new Compression({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8
      })
  ]
}