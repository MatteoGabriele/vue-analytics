import config from './config'

export default (string, type = 'warn') => {
  if (config.debug.enabled) {
    console[type](`[vue-analytics] ${string}`)
  }
}