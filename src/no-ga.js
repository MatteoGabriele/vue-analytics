import { getId } from './config'

export default () => {
  getId().forEach(id => {
    window[`ga-disable-${id}`] = true
  })
}