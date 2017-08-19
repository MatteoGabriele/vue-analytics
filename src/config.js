import { merge } from './helpers'

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
    pageviewTemplate: null
  },
  debug: {
    enabled: false,
    trace: false,
    sendHitTask: true
  },
  beforeFirstHit: () => {},
  ready: () => {},

  __untracked: []
}

export function update (params) {
  merge(config, params)
}

export const getId = () => [].concat(config.id)

export default config
