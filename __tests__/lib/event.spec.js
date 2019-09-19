window.ga = jest.fn()

let $vm

const initContext = (options) => {
  const Vue = require('vue')
  const VueAnalytics = require('../../src/index').default

  window.ga.mockClear()

  Vue.use(VueAnalytics, options)

  $vm = new Vue({})

  $vm.$mount()
}

beforeEach(() => {
  jest.resetModules()
})

it ('should track an event', () => {
  initContext({
    id: 'UA-1234-5'
  })

  $vm.$ga.event('foo', 'bar')
  expect(window.ga).toBeCalledWith('send', 'event', 'foo', 'bar')
})

it ('should track an event with tracker name', () => {
  initContext({
    id: 'UA-1234-5',
    trackerName: 'trackerName'
  })

  $vm.$ga.event('foo', 'bar')
  expect(window.ga).toBeCalledWith('trackerName.send', 'event', 'foo', 'bar')
})
