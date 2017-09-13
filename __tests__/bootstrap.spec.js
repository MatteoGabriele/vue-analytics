import Vue from 'vue'
import VueAnalytics, { onAnalyticsReady } from '../src/index'

it ('should throw an error if the domain Id is missing', () => {
  expect(() => {
    Vue.use(VueAnalytics, {})
  }).toThrowError(
    '[vue-analytics] Please enter a Google Analytics tracking ID'
  )
})

it ('should load Google Analytics script', function () {
  Vue.use(VueAnalytics, { id: 'UA-1234-5' })

  return onAnalyticsReady().then(() => {
    expect(window.ga).toBeDefined()
  })
})
