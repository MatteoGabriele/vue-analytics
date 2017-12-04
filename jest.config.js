const blueJest = require('blue-jest')

module.exports = Object.assign({}, blueJest, {
  moduleNameMapper: Object.assign({}, blueJest.moduleNameMapper, {
    '^lib/(.*)$': '<rootDir>/src/lib/$1',
    '^directives/(.*)$': '<rootDir>/src/directives/$1',
    'vue$': 'vue/dist/vue.min.js'
  })
})
