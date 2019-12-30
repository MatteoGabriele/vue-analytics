import babel from 'rollup-plugin-babel'
import del from 'rollup-plugin-delete'
import path from 'path'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

/** @type {import('rollup').RollupOptions} */
const baseConfig = {
  input: 'src/index.js',
  context: 'typeof self !== \'undefined\' ? self : this',
  output: {
    name: 'VueAnalytics',
    exports: 'named',
    sourcemap: true
  },
  plugins: [
    resolve(),
    babel({ exclude: 'node_modules/**' })
  ]
}

/** @type {Array<import('rollup').RollupOptions>} */
const config = [
  getConfig({ format: 'cjs', filename: pkg.main }),
  getConfig({ format: 'esm', filename: pkg.module }),
  getConfig({ format: 'umd', filename: pkg.unpkg }),
  getConfig({ format: 'umd', filename: pkg.unpkg, minify: true })
]

const [firstConfig] = config
firstConfig.plugins = firstConfig.plugins.concat(del({ targets: 'dist/* '}))

export default config

function getConfig({ format, filename, minify = false } = {}) {
  /** @type {import('rollup').RollupOptions} */
  const config = {
    ...baseConfig,
    output: {
      ...baseConfig.output,
      format,
      file: getFilename(filename, minify)
    }
  }
  if (minify) {
    config.plugins = config.plugins.concat(terser())
  }
  return config
}

function getFilename(filename, minify = false) {
  const dirname = path.dirname(filename)
  const extname = path.extname(filename)
  const basename = path.basename(filename, extname)
  filename = [basename, minify && '.min', extname].filter(Boolean).join('')
  return path.join(dirname, filename)
}
