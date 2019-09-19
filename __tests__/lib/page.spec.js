jest.mock('config')
jest.mock('load-script')

import VueRouter from 'vue-router'
import config from 'config'

const routes = [
  {
    name: 'home',
    path: '/',
    component: {
      name: 'home',
      render: h => h('div')
    }
  },
  {
    name: 'about',
    path: '/about',
    component: {
      name: 'about',
      render: h => h('div')
    }
  }
]

window.ga = jest.fn()

let $vm

const initContext = async (options) => {
  const Vue = require('vue')
  const VueAnalytics = require('../../src/index').default

  window.ga.mockClear()

  Vue.use(VueRouter)

  const router = new VueRouter({
    mode: 'hash',
    routes
  })

  Vue.use(VueAnalytics, {
    ...options,
    router
  })

  $vm = new Vue({
    router,
    render: (h) => h('router-view')
  })

  $vm.$mount()

  return Vue.nextTick()
}

beforeEach(() => {
  jest.resetModules()
})

it ('should track a page', async () => {
  await initContext({
    id: 'UA-1234-5'
  })

  $vm.$ga.page('/')

  expect(window.ga).toBeCalledWith('set', 'page', '/')
  expect(window.ga).toBeCalledWith('send', 'pageview', '/')
})

it ('should track a page with tracker name', async () => {
  await initContext({
    id: 'UA-1234-5',
    trackerName: 'trackerName'
  })

  $vm.$ga.page('/')

  expect(window.ga).toBeCalledWith('trackerName.set', 'page', '/')
  expect(window.ga).toBeCalledWith('trackerName.send', 'pageview', '/')
})

it ('should set and track page with a VueRouter instance', async () => {
  await initContext({
    id: 'UA-1234-5'
  })

  $vm.$ga.page($vm.$router)

  expect(window.ga).toBeCalledWith('set', 'page', '/')
  expect(window.ga).toBeCalledWith('send', 'pageview', '/')
})

it ('should set and track page with a VueRouter instance and a tracker name', async () => {
  await initContext({
    id: 'UA-1234-5',
    trackerName: 'trackerName'
  })

  $vm.$ga.page($vm.$router)

  expect(window.ga).toBeCalledWith('trackerName.set', 'page', '/')
  expect(window.ga).toBeCalledWith('trackerName.send', 'pageview', '/')
})

it ('should skip tracking when page first argument is a falsy value', async () => {
  await initContext({
    id: 'UA-1234-5'
  })

  $vm.$ga.page(null)
  $vm.$ga.page(false)
  $vm.$ga.page(undefined)
  // Google officially states that page path must begin with '/'
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#page
  $vm.$ga.page('')

  expect(window.ga).not.toHaveBeenCalled()
  expect(window.ga).not.toHaveBeenCalled()

  // Skip behavior must be explicit
  $vm.$ga.page()

  expect(window.ga).toHaveBeenCalled()
  expect(window.ga).toHaveBeenCalled()
})
