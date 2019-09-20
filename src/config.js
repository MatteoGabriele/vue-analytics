import { merge, noop } from './helpers'

const defaultConfig = {
  $vue: null,
  id: null,
  trackerName: null,
  router: null,
  fields: {},
  customIdFields: {},
  ignoreRoutes: [],
  linkers: [],
  commands: {},

  // https://github.com/MatteoGabriele/vue-analytics/issues/103
  disabled: false,

  customResourceURL: null,

  set: [],
  require: [],

  ecommerce: {
    enabled: false,
    options: null,
    enhanced: false
  },

  autoTracking: {
    screenview: false,
    shouldRouterUpdate: null,
    skipSamePath: false,
    exception: false,
    exceptionLogs: true,
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

  batch: {
    enabled: false,
    delay: 500,
    amount: 2
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

export function getTrackerName () {
  return config.trackerName
}

export default config
