const path = require('path')
const pkg = require('./package.json')

module.exports = {
  entry: './src/index.js',
  mode: 'production',
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
  }
}