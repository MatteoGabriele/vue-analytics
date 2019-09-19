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

it ('should set a variable on Google Analytics', () => {
  initContext({
    id: 'UA-1234-5'
  })

  $vm.$ga.set('foo', 'bar')

  expect(window.ga).toBeCalledWith('set', 'foo', 'bar')
})

it ('should set a variable on Google Analytics with tracker name', () => {
  initContext({
    id: 'UA-1234-5',
    trackerName: 'trackerName'
  })

  $vm.$ga.set('foo', 'bar')

  expect(window.ga).toBeCalledWith('trackerName.set', 'foo', 'bar')
})

it ('should set a variable on Google Analytics with an object literal', () => {
  initContext({
    id: 'UA-1234-5'
  })

  $vm.$ga.set({
    fieldName: 'foo',
    fieldValue: 'bar'
  })

  expect(window.ga).toBeCalledWith('set', {
    fieldName: 'foo',
    fieldValue: 'bar'
  })
})

it ('should set a variable on Google Analytics with an object literal with tracker name', () => {
  initContext({
    id: 'UA-1234-5',
    trackerName: 'trackerName'
  })

  $vm.$ga.set({
    fieldName: 'foo',
    fieldValue: 'bar'
  })

  expect(window.ga).toBeCalledWith('trackerName.set', {
    fieldName: 'foo',
    fieldValue: 'bar'
  })
})
