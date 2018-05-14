import { getId } from './config'

export default () => {
  if (typeof window === 'undefined') {
    return
  }

  getId().forEach(id => {
    window[`ga-disable-${id}`] = true
  })
}