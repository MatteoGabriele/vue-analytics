import load from 'load-script'
import { onAnalyticsReady, hasGoogleScript } from './helpers'
import config, { update } from './config'
import createTrackers from './create-trackers'
import untracked from 'lib/untracked'
import { startAutoTracking as pageAutoTracking } from 'lib/page'
import { startAutoTracking as exceptionAutoTracking } from 'lib/exception'

export default function bootstrap () {
  if (typeof document === 'undefined') {
    return
  }

  const { id, ready, debug, checkDuplicatedScript, disableScriptLoader } = config
  const filename = debug.enabled ? 'analytics_debug' : 'analytics'
  const googleScript = `https://www.google-analytics.com/${filename}.js`

  if (!id) {
    throw new Error('[vue-analytics] Please enter a Google Analytics tracking ID')
  }

  return new Promise((resolve, reject) => {
    if ((checkDuplicatedScript && hasGoogleScript(googleScript)) || disableScriptLoader) {
      return resolve()
    }

    load(googleScript, function (error) {
      if (error) {
        return reject('[vue-analytics] It\'s not possible to load Google Analytics script')
      }

      return resolve()
    })
  })
  .then(() => {
    return onAnalyticsReady()
  })
  .then(() => {
    // we first need to add trackers to be able to track
    // every other aspect of the application
    createTrackers()
    // trigger the plugin `ready` callback right after the trackers
    ready()
    // add exceptions auto tracking
    exceptionAutoTracking()
    // add page auto tracking
    pageAutoTracking()
    // track every untracked events before analytics was ready
    untracked()
  })
  .catch(error => {
    console.error(error)
  })
}
