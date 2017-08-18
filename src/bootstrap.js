import loadScript from 'load-script'
import { onAnalyticsReady } from './utils'
import config from './config'
import createTrackers from './create-trackers'

export default function bootstrap () {
  const { id, debug, ready } = config
  const file = debug.enabled ? 'analytics_debug.js' : 'analytics.js'
  const gaUrl = `https://www.google-analytics.com/${file}`

  if (!id) {
    throw new Error('[vue-analytics] Please enter a Google Analytics tracking ID')
  }

  loadScript(gaUrl, function (error) {
    if (error) {
      console.error('[vue-analytics] It\'s not possible to load Google Analytics script')
      return
    }

    onAnalyticsReady().then(() => {
      createTrackers()
      ready()
    })
  })
}
