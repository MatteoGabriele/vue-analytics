import { getId } from './config'

export default (disable = true) => {
  if (typeof window === 'undefined') {
    return
  }

  getId().forEach(id => {
    window[`ga-disable-${id}`] = disable
  })
}