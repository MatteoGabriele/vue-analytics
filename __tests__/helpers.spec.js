import * as helpers from '../src/helpers'

const id = 'UA-1234-5'

describe('noop', function () {
  it ('should be a function', function () {
    expect(typeof helpers.noop).toEqual('function')
  })
})

describe('merge', function () {
  it ('should merge two objects', function () {
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

describe('getTracker', function () {
  it ('should return the tracking id without dashes', function () {
    const tracker1 = helpers.getTracker(id)
    expect(tracker1).toEqual('UA12345')
  })
})
