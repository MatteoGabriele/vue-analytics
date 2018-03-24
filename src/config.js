import { merge, noop } from './helpers'

const isProduction = process.env.NODE_ENV === 'production'

const defaultConfig = {
  id: null,
  router: null,
  fields: {},
  ignoreRoutes: [],
  linkers: [],

  commands: {},

  set: [],
  require: [],

  ecommerce: {
    enabled: false,
    options: null,
    enhanced: false
  },

  autoTracking: {
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

export default config
