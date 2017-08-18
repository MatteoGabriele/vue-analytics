import { merge } from './utils'

let config = {
  id: null,
  fields: {},
  linkers: [],
  autoTracking: {
    exception: false,
    page: true
  },
  debug: {
    enabled: false,
    trace: false,
    sendHitTask: true
  },
  beforeFirstHit: () => {},
  ready: () => {}
}

export function update (params) {
  merge(config, params)
}

export const getId = () => [].concat(config.id)

export default config
