import { merge, noop } from './helpers'

let config = {
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

export function update (params) {
  merge(config, params)
}

export const getId = () => [].concat(config.id)

export default config
