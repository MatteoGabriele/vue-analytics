import VueAnalytics from '../../src'

window.ga = jest.fn()

let $vm

const initContext = (options) => {
  const Vue = require('vue')

  window.ga.mockClear()

  Vue.config.errorHandler = jest.fn()

  Vue.use(VueAnalytics, options)

  $vm = new Vue({})

  $vm.$mount()
}

beforeEach(() => {
  jest.resetModules()
})

it ('should track an error exception', () => {
  initContext({
    id: 'UA-1234-5'
  })

  $vm.$ga.exception('bad stuff', true)

  expect(window.ga).toBeCalledWith('send', 'exception', {
    exDescription: 'bad stuff',
    exFatal: true
  })
})

it ('should track an error exception with tracker name', () => {
  initContext({
    id: 'UA-1234-5',
    trackerName: 'trackerName'
  })

  $vm.$ga.exception('bad stuff', true)

  expect(window.ga).toBeCalledWith('trackerName.send', 'exception', {
    exDescription: 'bad stuff',
    exFatal: true
  })
})
