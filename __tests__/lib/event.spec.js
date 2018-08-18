import Vue from 'vue'
import VueAnalytics from '../../src'

window.ga = jest.fn()

let $vm

beforeEach(() => {
  window.ga.mockClear()

  Vue.use(VueAnalytics, {
    id: 'UA-1234-5'
  })

  $vm = new Vue({})

  $vm.$mount()
})

it ('should track an event', () => {
  $vm.$ga.event('foo', 'bar')
  expect(window.ga).toBeCalledWith('send', 'event', 'foo', 'bar')
})
