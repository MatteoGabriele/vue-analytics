const base = require('../base.config')
const merge = require('webpack-merge')
const webpack = require('webpack')
const pkg = require('../../package.json')
const ora = require('ora')
const CompressionPlugin = require('compression-webpack-plugin')

const spinner = ora()

const webpackConfig = merge.smart({}, base, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
      sourceMap: true
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 0,
      minRatio: 0.8
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
})

const compiler = webpack(webpackConfig)

console.log('')
spinner.text = 'Build package'
spinner.start()

compiler.run(function (error, stats) {
  if (error) {
    spinner.fail()
    console.log('')
    console.log(error)
    process.exit(1)
  }

  spinner.succeed()
  console.log('')

  process.stdout.write(stats.toString({
    colors: true,
    hash: false,
    version: false,
    timings: false,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
