jest.mock('load-script')

import Vue from 'vue'
import VueAnalytics from '../src'
import analyticsMiddleware from '../src/vuex-middleware'
window.ga = jest.fn()

let $vm
let store
beforeEach(() => {
    window.ga.mockClear()
    store = {
        subscribers: [],
        subscribe: function (fn) {
            this.subscribers.push(fn)
        },
        fire: function (mutation) {
            this.subscribers.forEach(x => { x(mutation) })
        }
    }

    analyticsMiddleware(store)
    Vue.use(VueAnalytics, {
        id: 'UA-1234-5'
    })
    $vm = new Vue({})

    $vm.$mount()
})

describe('input check', () => {
    it('should allow meta tags without analytics', () => {
        let mutation = {
            payload: {
                meta: {

                }
            }
        }
        expect(() => { store.fire(mutation) }).not.toThrowError()
    })

    it('should throw an error when analytics is not an array', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: {}
                }
            }
        }
        expect(() => { store.fire(mutation) }).toThrowError()
    })

    it('should throw an unknown type error', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: [['unknown']]
                }
            }
        }
        expect(() => { store.fire(mutation) }).toThrowError()
    })

    it('should throw an unknown method for type error', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: [['event:unknown']]
                }
            }
        }
        expect(() => { store.fire(mutation) }).toThrowError()
    })

    it('should throw an error because ecommerce requires a method call', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: [['ecommerce']]
                }
            }
        }
        expect(() => { store.fire(mutation) }).toThrowError()
    })
})

describe('fire event', () => {
    it('should fire a simple tracking event based on the meta payload', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: [
                        [
                            'event', 'CLICK', 'TEST', 'LABEL', 1
                        ]
                    ]
                }
            }
        }
        store.fire(mutation)
        expect(window.ga).toBeCalledWith('send', 'event', 'CLICK', 'TEST', 'LABEL', 1)
    })


    it('should fire a simple event based on the meta payload', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: [
                        [
                            'event', 'foo', 'bar'
                        ]
                    ]
                }
            }
        }
        store.fire(mutation)
        expect(window.ga).toBeCalledWith('send', 'event', 'foo', 'bar')
    })

    it('should fire a simple exception event based on the meta payload', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: [
                        [
                            'exception', 'CLICK', 'TEST'
                        ]
                    ]
                }
            }
        }
        store.fire(mutation)
        expect(window.ga).toBeCalledWith('send', 'exception', { exDescription: 'CLICK', exFatal: 'TEST' })
    })

    it('should fire a simple set event based on the meta payload', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: [
                        [
                            'set', 'foo', 'bar'
                        ]
                    ]
                }
            }
        }
        store.fire(mutation)
        expect(window.ga).toBeCalledWith('set', 'foo', 'bar')
    })


    it('should fire a simple social event based on the meta payload', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: [
                        [
                            'social', 'Facebook', 'like', 'http://foo.com'
                        ]
                    ]
                }
            }
        }
        store.fire(mutation)
        expect(window.ga).toBeCalledWith('send', 'social', 'Facebook', 'like', 'http://foo.com')
    })

    it('should fire a simple timing event based on the meta payload', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: [
                        [
                            'time', 'category', 'variable', 123, 'label'
                        ]
                    ]
                }
            }
        }
        store.fire(mutation)
        expect(window.ga).toBeCalledWith('send', 'timing', 'category', 'variable', 123, 'label')
    })


    it('should fire a simple timing event based on the meta payload', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: [
                        [
                            'time', 'category', 'variable', 123, 'label'
                        ]
                    ]
                }
            }
        }
        store.fire(mutation)
        expect(window.ga).toBeCalledWith('send', 'timing', 'category', 'variable', 123, 'label')
    })

    it('should fire a simple page event based on the meta payload', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: [
                        [
                            'page', '/'
                        ]
                    ]
                }
            }
        }
        store.fire(mutation)
        expect(window.ga).toBeCalledWith('set', 'page', '/')
        expect(window.ga).toBeCalledWith('send', 'pageview', '/')
    })

    it('should fire a simple require event based on the meta payload', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: [
                        [
                            'require', 'myplugin', { foo: 'bar' }
                        ]
                    ]
                }
            }
        }
        store.fire(mutation)
        expect(window.ga).toBeCalledWith('require', 'myplugin', {
            foo: 'bar'
        })
    })

    it('should fire a simple query event based on the meta payload', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: [
                        [
                            'query', 'test'
                        ]
                    ]
                }
            }
        }
        store.fire(mutation)
        expect(window.ga).toBeCalledWith('test')
    })

    it('should fire a ecommerce query event based on the meta payload', () => {
        let item = {
            id: '1234',
            name: 'Fluffy Pink Bunnies',
            sku: 'DD23444',
            category: 'Party Toys',
            price: '11.99',
            quantity: '1'
        }
        let mutation = {
            payload: {
                meta: {
                    analytics: [
                        ['ecommerce:addItem', item]
                    ]
                }
            }
        }
        store.fire(mutation)
        expect(window.ga).toBeCalledWith('ecommerce:addItem', item)
    })

    it('should allow multiple events to fire', () => {
        let mutation = {
            payload: {
                meta: {
                    analytics: [
                        [
                            'event', 'foo', 'bar'
                        ],
                        [
                            'exception', 'CLICK', 'TEST', 'LABEL', 1
                        ]
                    ]
                }
            }
        }
        store.fire(mutation)
        expect(window.ga).toBeCalledWith('send', 'event', 'foo', 'bar')
        expect(window.ga).toBeCalledWith('send', 'exception', { exDescription: 'CLICK', exFatal: 'TEST' })

    })
})
