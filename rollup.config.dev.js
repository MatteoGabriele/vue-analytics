import babel from 'rollup-plugin-babel'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/index.js',
  context: 'typeof self !== \'undefined\' ? self : this',
  output: {
    format: 'esm',
    exports: 'named',
    sourcemap: true,
    file: pkg.module
  },
  plugins: [
    resolve(),
    babel({ exclude: 'node_modules/**' })
  ]
}

export default config
