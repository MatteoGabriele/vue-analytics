import Vue from 'vue'
import VueAnalytics from '../../src'

window.ga = jest.fn()

let $vm

beforeEach(() => {
  window.ga.mockClear()

  Vue.use(VueAnalytics, {
    id: 'UA-1234-5',
    ecommerce: {
      enabled: true,
      enhanced: true
    },
  })

  $vm = new Vue({})

  $vm.$mount()
})

it('should track a ecommerce addItem interaction', () => {
  const item = {
    id: '1234',
    name: 'Name'
  }

  $vm.$ga.ecommerce.addItem(item)

  expect(window.ga).toBeCalledWith('ecommerce:addItem', item)
})

it('should track a ecommerce addProduct interaction', () => {
  const product = {
    id: '1234',
    name: 'Name'
  }

  $vm.$ga.ecommerce.addProduct(product)

  expect(window.ga).toBeCalledWith('ec:addProduct', product)
})

