import { merge, noop } from './helpers'

const defaultConfig = {
  id: null,
  router: null,
  fields: {},
  ignoreRoutes: [],
  linkers: [],

  autoTracking: {
    exception: false,
    page: true,
    pageviewOnLoad: true,
    pageviewTemplate: null,
    untracked: true
  },

  debug: {
    enabled: false,
    trace: false,
    sendHitTask: true
  },

  beforeFirstHit: noop,
  ready: noop,

  untracked: []
}

let config = { ...defaultConfig }

export function update (params) {
  merge(config, params)
}

export function reset () {
  config = { ...defaultConfig }
}

export function getId () {
  return [].concat(config.id)
}

export default config
