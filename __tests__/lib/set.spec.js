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

it ('should set a variable on Google Analytics', () => {
  $vm.$ga.set('foo', 'bar')

  expect(window.ga).toBeCalledWith('set', 'foo', 'bar')
})

it ('should set a variable on Google Analytics with an object literal', () => {
  $vm.$ga.set({
    fieldName: 'foo',
    fieldValue: 'bar'
  })

  expect(window.ga).toBeCalledWith('set', {
    fieldName: 'foo',
    fieldValue: 'bar'
  })
})
