import config from './config'
import { getName, getListId, warn } from './utils'
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
      warn('Ops! Is not possible to load Google Analytics script')
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

      const ids = getListId()

      ids.forEach(function (id) {
        if (ids.length > 1) {
          // we need to register the name used by the ga methods so that
          // when a method is used Google knows which account did it
          options['name'] = getName(id)
        }

        window.ga('create', id, 'auto', options)
      })

      // the callback is fired when window.ga is available and before any other hit is sent
      // see MatteoGabriele/vue-analytics/issues/20
      if (callback && typeof callback === 'function') {
        callback()
      }

      if (!config.debug.sendHitTask) {
        features.set('sendHitTask', null)
      }

      features.autoTrackException()
      features.autoTrackPage(router)
    }, 10)
  })
}
