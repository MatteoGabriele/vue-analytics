const path = require('path')

module.exports = {
  // coverageDirectory: '<rootDir>/src/__tests__/coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/node_modules/**'
  ],
  testPathIgnorePatterns: [
    // '<rootDir>/__tests__/coverage/'
  ],
  testMatch: ['**/__tests__/**/*.spec.js'],
  coverageReporters: ['html', 'text-summary'],
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^lib/(.*)$': '<rootDir>/src/lib/$1',
    '^directives/(.*)$': '<rootDir>/src/directives/$1'
  },
  transform: {
    '^.+\\.js$': path.join(__dirname, 'jest.transform.js'),
    '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor'
  }
}
