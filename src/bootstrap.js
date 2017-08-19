import loadScript from 'load-script'
import { onAnalyticsReady } from './helpers'
import config from './config'
import createTrackers from './create-trackers'
import query from 'lib/query'
import { startAutoTracking as pageAutoTracking } from 'lib/page'
import { startAutoTracking as exceptionAutoTracking } from 'lib/exception'
import { update } from './config'

function trackUntracked () {
  const untracked = config.__untracked
  let utrackedLen = untracked.length

  if (!utrackedLen) {
    return
  }

  while (utrackedLen--) {
    const item = untracked[utrackedLen]
    query(item.method, ...item.arguments)
    untracked.splice(utrackedLen, 1)
  }
}

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
      // add Google Analytics trackers
      // we need to add trackers first to be able to track
      // every other aspect of the application
      createTrackers()
      // add exceptions auto tracking
      exceptionAutoTracking()
      // add page auto tracking
      pageAutoTracking()
      // track every untracked events
      trackUntracked()
      // trigger the plugin `ready` callback
      ready()
    })
  })
}
