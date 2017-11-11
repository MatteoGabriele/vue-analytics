import { merge, noop } from './helpers'

const defaultConfig = {
  id: null,
  router: null,
  fields: {},
  ignoreRoutes: [],
  linkers: [],

  set: [],

  autoTracking: {
    exception: false,
    page: true,
    transformQueryString: true,
    pageviewOnLoad: true,
    pageviewTemplate: null,
    untracked: true,
    prependBase: true
  },

  debug: {
    enabled: false,
    trace: false,
    sendHitTask: true
  },

  checkDuplicatedScript: false,
  disableScriptLoader: false,

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
  return !config.id ? [] : [].concat(config.id)
}

export default config
