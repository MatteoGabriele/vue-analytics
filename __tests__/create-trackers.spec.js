jest.mock('config')

import config, { mockUpdate, mockGetId, mockReset } from 'config'
import createTrackers from '../src/create-trackers'
import { getTracker } from '../src/helpers'

window.ga = jest.fn()

afterEach(() => {
  mockReset()
})

describe('create trackers', () => {
  it ('should initialize single tracker', () => {
    mockUpdate({ id: 'UA-1234-1' })

    createTrackers()
    expect(window.ga).toBeCalledWith('create', config.id, 'auto', {})
    expect(window.ga).not.toBeCalledWith('set', 'sendHitTask', null)
  })

  it ('should initialize multiple trackers', () => {
    mockUpdate({ id: [ 'UA-1234-1', 'UA-1234-2' ] })

    createTrackers()

    mockGetId().forEach((id) => {
      expect(window.ga).toBeCalledWith('create', id, 'auto', { 'name': getTracker(id) })
    })
  })

  it ('should not send hit when sendHitTask is false', () => {
    mockUpdate({
      id: 'UA-1234-1',
      debug: {
        sendHitTask: false
      }
    })

    createTrackers()

    expect(window.ga).toBeCalledWith('set', 'sendHitTask', null)
  })

  it ('should add linkers', function () {
    mockUpdate({
      id: 'UA-1234-1',
      linkers: ['www.google.com', 'www.bing.com']
    })

    createTrackers()

    expect(window.ga).toBeCalledWith('require', 'linker')
    expect(window.ga).toBeCalledWith('linker:autoLink', config.linkers)
  })
})
