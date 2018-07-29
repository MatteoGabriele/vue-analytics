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

  it('should track timing', () => {
    wrapper = shallowMount({
      template: '<div></div>'
    }, {
      localVue
    })

    wrapper.vm.$ga.time('category', 'variable', 123, 'label')

    expect(window.ga).toBeCalledWith('send', 'timing', 'category', 'variable', 123, 'label')
  })

  it('should track timing with an object literal', () => {
    wrapper = shallowMount({
      template: '<div></div>'
    }, {
      localVue
    })

    wrapper.vm.$ga.time({
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
})