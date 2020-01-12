import { name } from './package.json'

/** @type {import('bili').Config} */
const config = {
  input: {
    [name]: './src/index.js'
  },
  output: {
    dir: './dist/',
    format: ['esm', 'cjs', 'umd', 'umd-min'],
    moduleName: 'VueAnalytics'
  },
  extendRollupConfig(config) {
    config.inputConfig.context = "typeof self !== 'undefined' ? self : this"
    return config
  }
}

export default config
