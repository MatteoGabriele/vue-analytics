import Vue from 'vue'
import VueAnalytics from '../../src'

window.ga = jest.fn()

Vue.use(VueAnalytics, {
  id: 'UA-1234-5',
  autoTracking: {
    exception: true,
  },
})

const renderError = new Error('render error')
let $vm

beforeEach(() => {
  $vm = new Vue({
    created() {
      throw renderError
    }
  })
  $vm.$mount()
})

it('should track Vue render error', () => {
  expect(window.ga).toBeCalledWith('send', 'exception', {
    exDescription: 'render error',
    exFatal: true
  })
})

it('should preserve original error handler', () => {
  Vue.config.errorHandler = jest.fn()
  expect(window.ga).not.toBeCalledWith(renderError, $vm, 'created hook')
})
