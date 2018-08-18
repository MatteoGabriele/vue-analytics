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

it ('should require a plugin', () => {
  $vm.$ga.require('myplugin')

  expect(window.ga).toBeCalledWith('require', 'myplugin')
})

it ('should require a plugin with options', () => {
  $vm.$ga.require('myplugin', {
    foo: 'bar'
  })

  expect(window.ga).toBeCalledWith('require', 'myplugin', {
    foo: 'bar'
  })
})
