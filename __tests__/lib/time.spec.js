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

it ('should track timing', () => {
  initContext({
    id: 'UA-1234-5'
  })

  $vm.$ga.time('category', 'variable', 123, 'label')

  expect(window.ga).toBeCalledWith('send', 'timing', 'category', 'variable', 123, 'label')
})

it ('should track timing with a tracker name', () => {
  initContext({
    id: 'UA-1234-5',
    trackerName: 'trackerName'
  })

  $vm.$ga.time('category', 'variable', 123, 'label')

  expect(window.ga).toBeCalledWith('trackerName.send', 'timing', 'category', 'variable', 123, 'label')
})

it ('should track timing with an object literal', () => {
  initContext({
    id: 'UA-1234-5'
  })

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

it ('should track timing with an object literal with a tracker name', () => {
  initContext({
    id: 'UA-1234-5',
    trackerName: 'trackerName'
  })

  $vm.$ga.time({
    timingCategory: 'category',
    timingVar: 'variable',
    timingValue: 123,
    timingLabel: 'label'
  })

  expect(window.ga).toBeCalledWith('trackerName.send', 'timing', {
    timingCategory: 'category',
    timingVar: 'variable',
    timingValue: 123,
    timingLabel: 'label'
  })
})
