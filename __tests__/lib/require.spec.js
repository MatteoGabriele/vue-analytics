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

it ('should require a plugin', () => {
  initContext({
    id: 'UA-1234-5'
  })

  $vm.$ga.require('myplugin')

  expect(window.ga).toBeCalledWith('require', 'myplugin')
})

it ('should require a plugin with a tracker name', () => {
  initContext({
    id: 'UA-1234-5',
    trackerName: 'trackerName'
  })

  $vm.$ga.require('myplugin')

  expect(window.ga).toBeCalledWith('trackerName.require', 'myplugin')
})

it ('should require a plugin with options', () => {
  initContext({
    id: 'UA-1234-5'
  })

  $vm.$ga.require('myplugin', {
    foo: 'bar'
  })

  expect(window.ga).toBeCalledWith('require', 'myplugin', {
    foo: 'bar'
  })
})
