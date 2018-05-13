import { getId } from './config'

export default () => {
  if (!window) {
    return
  }

  getId().forEach(id => {
    window[`ga-disable-${id}`] = true
  })
}