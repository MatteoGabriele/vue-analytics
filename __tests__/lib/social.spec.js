import VueAnalytics from '../../src'
import { shallowMount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

const id = 'UA-1234567-8'

localVue.use(VueAnalytics, { id })

describe('lib/social', () => {
  let wrapper

  beforeEach(() => {
    window.ga = jest.fn()
  })

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('should track social interaction', () => {
    wrapper = shallowMount({
      template: '<div></div>'
    }, {
      localVue
    })

    wrapper.vm.$ga.social('Facebook', 'like', 'foo.com')

    expect(window.ga).toBeCalledWith('send', 'social', 'Facebook', 'like', 'foo.com')
  })

  it('should social interaction with an object literal', () => {
    wrapper = shallowMount({
      template: '<div></div>'
    }, {
      localVue
    })

    wrapper.vm.$ga.social({
      socialNetwork: 'Facebook',
      socialAction: 'like',
      socialTarget: 'foo.com'
    })

    expect(window.ga).toBeCalledWith('send', 'social', {
      socialNetwork: 'Facebook',
      socialAction: 'like',
      socialTarget: 'foo.com'
    })
  })
})
