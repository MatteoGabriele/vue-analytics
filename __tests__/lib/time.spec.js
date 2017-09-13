import Vue from 'vue'
import VueAnalytics from '../../src'

window.ga = jest.fn()

let $vm

beforeEach(() => {
  Vue.use(VueAnalytics, {
    id: 'UA-1234-5'
  })

  $vm = new Vue({})

  $vm.$mount()
})

it ('should track timing', () => {
  $vm.$ga.time('category', 'variable', 123, 'label')

  expect(window.ga).toBeCalledWith('send', 'timing', 'category', 'variable', 123, 'label')
})

it ('should track timing with an object literal', () => {
  $vm.$ga.time({
    timingCategory: 'category',
    timingVar: 'variable',
    timingValue: 123,
    timingLabel: 'label'
  })

  expect(window.ga).toBeCalledWith('send', 'timing', {
    timingCategory: 'category',
    timingVar: 'variable',
    timingValue: 123,
    timingLabel: 'label'
  })
})
