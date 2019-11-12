const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = function (env, argv) {
  const isProduction = argv.mode === 'production'

  return {
    output: {
      libraryTarget: 'umd',
      filename: 'vue-analytics.js'
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: isProduction
          }
        })
      ]
    },
    plugins: [
      ...(isProduction ? [new CompressionPlugin()] : [])
    ]
  }
}