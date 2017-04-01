import config from './config'
import { getName, warn } from './utils'
import features from './features/index'
import loadScript from 'load-script'

export default function init (router, callback) {
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

    const poll = setInterval(function () {
      if (!window.ga) {
        return
      }

      clearInterval(poll)

      if (config.debug.enabled) {
        window.ga_debug = {
          trace: config.debug.trace
        }
      }

      [].concat(config.id).forEach(function (id) {
        options['name'] = getName(id)
        window.ga('create', id, 'auto', options)
      })

      if (callback && typeof callback === 'function') {
        callback()
      }

      if (!config.debug.sendHitTask) {
        features.set('sendHitTask', null)
      }

      window.ga('send', 'pageview')

      features.autoTracking(router)
    }, 10)
  })
}
