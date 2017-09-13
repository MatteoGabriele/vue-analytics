jest.mock('load-script')

import Vue from 'vue'
import VueAnalytics, { onAnalyticsReady } from '../src/index'

it ('should throw an error if the domain Id is missing', () => {
  expect(() => {
    Vue.use(VueAnalytics, {})
  }).toThrowError()
})

it ('should load Google Analytics script', function () {
  expect(() => {
    Vue.use(VueAnalytics, { id: 'UA-1234-5' })
  }).not.toThrowError()
})
