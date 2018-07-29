import VueAnalytics from '../../src'
import { shallowMount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

const id = 'UA-1234567-8'

localVue.use(VueAnalytics, { id })

describe('lib/event', () => {
  let wrapper

  beforeEach(() => {
    window.ga = jest.fn()
  })

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('should require a plugin', () => {
    wrapper = shallowMount({
      template: '<div></div>'
    }, {
      localVue
    })

    wrapper.vm.$ga.event('foo', 'bar')

    expect(window.ga).toBeCalledWith('send', 'event', 'foo', 'bar')
  })
})
