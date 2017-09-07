jest.mock('config')

import * as helpers from '../src/helpers'
import config, { mockGetId, mockUpdate } from 'config'

describe('noop', () => {
  it ('should be a function', () => {
    expect(typeof helpers.noop).toEqual('function')
  })
})

describe('merge', () => {
  it ('should merge two objects', () => {
    const a = { a: 1, c: { a: 1 } }
    const b = { b: 1, c: { b: 1 } }
    const c = helpers.merge(a, b)

    expect(c).toMatchObject({
      a: 1,
      b: 1,
      c: {
        b: 1,
        a: 1
      }
    })
  })
})

describe('getMethod', () => {
  it ('should return the plain method name if single tracker', () => {
    mockUpdate({ id: 'UA-1234-5' })

    const method = helpers.getMethod('send', config.id)
    expect(method).toEqual('send')
  })

  it ('should return the method name prepended with tracker name if multiple trackers', () => {
    mockUpdate({ id: ['UA-1234-5', 'UA-1234-6'] })

    const method = helpers.getMethod('send', 'UA-1234-5')
    expect(method).toEqual('UA12345.send')
  })
})

describe('getTracker', () => {
  it ('should return the tracking id without dashes', () => {
    const tracker1 = helpers.getTracker('UA-1234-5')
    expect(tracker1).toEqual('UA12345')
  })
})

describe('getQueryString', () => {
  it ('should return a query string from an object literal', () => {
    const obj = { name: 'matteo', surname: 'gabriele' }
    const queryString = helpers.getQueryString(obj)

    expect(queryString).toEqual('?name=matteo&surname=gabriele')
  })

  it ('should return a empty string if object literal is empty', () => {
    const obj = {}
    const queryString = helpers.getQueryString(obj)

    expect(queryString).toEqual('')
  })
})
