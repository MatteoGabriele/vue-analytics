import Vue from 'vue'
import VueAnalytics from '../../src'

window.ga = jest.fn()

let $vm

beforeEach(() => {
  window.ga.mockClear()

  Vue.config.errorHandler = jest.fn()

  Vue.use(VueAnalytics, {
    id: 'UA-1234-5'
  })

  $vm = new Vue({})

  $vm.$mount()
})

it ('should track an error exception', () => {
  $vm.$ga.exception('bad stuff', true)

  expect(window.ga).toBeCalledWith('send', 'exception', {
    exDescription: 'bad stuff',
    exFatal: true
  })
})
