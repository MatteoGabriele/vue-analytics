import Vue from 'vue'
import VueAnalytics from '../../src'

window.ga = jest.fn()

let $vm

beforeEach(() => {
  Vue.use(VueAnalytics, {
    id: 'UA-1234-5'
  })

  $vm = new Vue({})

  $vm.$mount()
})

it ('should track a social interaction', () => {
  $vm.$ga.social('Facebook', 'like', 'http://foo.com')
  expect(window.ga).toBeCalledWith('send', 'social', 'Facebook', 'like', 'http://foo.com')
})

it ('should track a social interaction with an object literal', () => {
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
