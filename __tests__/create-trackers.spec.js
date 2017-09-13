jest.mock('config')

import config, { mockUpdate, mockGetId, mockReset } from 'config'
import createTrackers from '../src/create-trackers'
import { getTracker } from '../src/helpers'

window.ga = jest.fn()

afterEach(() => {
  mockReset()
})

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

it ('should add linkers if list is not empty', function () {
  mockUpdate({
    id: 'UA-1234-1',
    linkers: ['www.google.com', 'www.bing.com']
  })

  createTrackers()

  expect(config.linkers).toHaveLength(2)
  expect(window.ga).toBeCalledWith('require', 'linker')
  expect(window.ga).toBeCalledWith('linker:autoLink', config.linkers)
})

it ('should stop sending hit if sendHitTask is set to false', () => {
  mockUpdate({
    id: 'UA-1234-1',
    debug: {
      sendHitTask: false
    }
  })

  createTrackers()

  expect(config.debug.sendHitTask).toBe(false)
  expect(window.ga).toBeCalledWith('set', 'sendHitTask', null)
})

it ('should set the trace property if debug is enabled', () => {
  mockUpdate({
    id: 'UA-1234-1',
    debug: {
      enabled: true,
      trace: true
    }
  })

  createTrackers()

  expect(config.debug.enabled).toBe(true)
  expect(window.ga_debug.trace).toBe(true)
})
