import config from './config'
import { warn } from './utils'
import set from './set'
import autoTracking from './track/autoTracking'
import loadScript from 'load-script'

export default function (router, callback) {
  if (config.manual) {
    return
  }

  if (!config.id || !config.id.length) {
    const url = 'https://github.com/MatteoGabriele/vue-analytics#usage'
    warn('Please enter a Google Analaytics tracking ID', url)
    return
  }

  const options = config.userId || {}
  const debugSource = config.debug.enabled ? '_debug' : ''
  const source = `https://www.google-analytics.com/analytics${debugSource}.js`

  loadScript(source, function (error, script) {
    if (error) {
      warn('Ops! Could\'t load the Google Analytics script')
      return
    }

    if (callback && typeof callback === 'function') {
      callback()
    }

    if (config.debug.enabled) {
      window.ga_debug = {
        trace: config.debug.trace
      }
    }

    [].concat(config.id).forEach(function (id) {
      options['name'] = id.replace(/-/g, '')
      window.ga('create', id, 'auto', options)
    })

    if (!config.debug.sendHitTask) {
      set('sendHitTask', null)
    }

    window.ga('send', 'pageview')

    autoTracking(router)
  })
}
