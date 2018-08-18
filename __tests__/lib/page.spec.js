jest.mock('config')
jest.mock('load-script')

import Vue from 'vue'
import VueAnalytics from '../../src/index'
import VueRouter from 'vue-router'
import config, { mockUpdate } from 'config'

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

beforeEach(done => {
  window.ga.mockClear()

  Vue.use(VueRouter)

  const router = new VueRouter({
    mode: 'hash',
    routes
  })

  Vue.use(VueAnalytics, {
    id: 'UA-1234-5',
    router
  })

  $vm = new Vue({
    router,
    render: (h) => h('router-view')
  })

  $vm.$mount()

  Vue.nextTick(done)
})

it ('should track a page', () => {
  $vm.$ga.page('/')

  expect(window.ga).toBeCalledWith('set', 'page', '/')
  expect(window.ga).toBeCalledWith('send', 'pageview', '/')
})

it ('should set and track page with a VueRouter instance', () => {
  $vm.$ga.page($vm.$router)

  expect(window.ga).toBeCalledWith('set', 'page', '/')
  expect(window.ga).toBeCalledWith('send', 'pageview', '/')
})
