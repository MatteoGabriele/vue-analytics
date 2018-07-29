import VueAnalytics from '../../src'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'

jest.mock('config')
jest.mock('load-script')

const localVue = createLocalVue()

const id = 'UA-1234567-8'

localVue.use(VueRouter)

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

const router = new VueRouter({
  mode: 'hash',
  routes
})

localVue.use(VueAnalytics, {
  id,
  router
})

describe('lib/page', () => {
  let wrapper

  beforeEach(() => {
    window.ga = jest.fn()
  })

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it ('should track a page', () => {
    wrapper = shallowMount({
      template: '<div></div>'
    }, {
      localVue,
      router
    })

    wrapper.vm.$ga.page('/')

    expect(window.ga).toBeCalledWith('send', 'pageview', '/')
  })

  it ('should set and track page with a VueRouter instance', () => {
    wrapper = shallowMount({
      template: '<div></div>'
    }, {
      localVue,
      router
    })

    wrapper.vm.$ga.page(wrapper.vm.$router)

    expect(window.ga).toBeCalledWith('set', 'page', '/')
    expect(window.ga).toBeCalledWith('send', 'pageview')
  })
})