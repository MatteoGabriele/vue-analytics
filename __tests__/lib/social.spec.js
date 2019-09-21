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

it ('should track a social interaction', () => {
  initContext({
    id: 'UA-1234-5'
  })

  $vm.$ga.social('Facebook', 'like', 'http://foo.com')
  expect(window.ga).toBeCalledWith('send', 'social', 'Facebook', 'like', 'http://foo.com')
})

it ('should track a social interaction with a tracker name', () => {
  initContext({
    id: 'UA-1234-5',
    trackerName: 'trackerName'
  })

  $vm.$ga.social('Facebook', 'like', 'http://foo.com')
  expect(window.ga).toBeCalledWith('trackerName.send', 'social', 'Facebook', 'like', 'http://foo.com')
})

it ('should track a social interaction with an object literal', () => {
  initContext({
    id: 'UA-1234-5'
  })

  $vm.$ga.social({
    socialNetwork: 'Facebook',
    socialAction: 'like',
    socialTarget: 'http://foo.com'
  })

  expect(window.ga).toBeCalledWith('send', 'social', {
    socialNetwork: 'Facebook',
    socialAction: 'like',
    socialTarget: 'http://foo.com'
  })
})

it ('should track a social interaction with an object literal with a tracker name', () => {
  initContext({
    id: 'UA-1234-5',
    trackerName: 'trackerName'
  })

  $vm.$ga.social({
    socialNetwork: 'Facebook',
    socialAction: 'like',
    socialTarget: 'http://foo.com'
  })

  expect(window.ga).toBeCalledWith('trackerName.send', 'social', {
    socialNetwork: 'Facebook',
    socialAction: 'like',
    socialTarget: 'http://foo.com'
  })
})
