import VueAnalytics from '../../src'
import { shallowMount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

const id = 'UA-1234567-8'

localVue.use(VueAnalytics, { id })

describe('lib/set', () => {
  let wrapper

  beforeEach(() => {
    window.ga = jest.fn()
  })

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('should set a variable on Google Analytics', () => {
    wrapper = shallowMount({
      template: '<div></div>'
    }, {
      localVue
    })

    wrapper.vm.$ga.set('foo', 'bar')

    expect(window.ga).toBeCalledWith('set', 'foo', 'bar')
  })

  it('should set a variable on Google Analytics', () => {
    wrapper = shallowMount({
      template: '<div></div>'
    }, {
      localVue
    })

    wrapper.vm.$ga.set({
      fieldName: 'foo',
      fieldValue: 'bar'
    })

    expect(window.ga).toBeCalledWith('set', {
      fieldName: 'foo',
      fieldValue: 'bar'
    })
  })
})