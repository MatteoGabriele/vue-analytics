import { promisify, loadScript, shouldGaLoad } from './helpers'
import config, { update } from './config'
import createTrackers from './create-trackers'
import collectors from './collectors'
import { autoTracking } from 'lib/page'
import untracked from './untracked'
import noga from './no-ga'

export default () => {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  const { disableScriptLoader: noScript, ready } = config
  const filename = config.debug.enabled ? 'analytics_debug' : 'analytics'
  const resource = config.customResourceURL || `https://www.google-analytics.com/${filename}.js`

  if (!config.id) {
    throw new Error(
      '[vue-analytics] Missing the "id" parameter. Add at least one tracking domain ID'
    )
  }

  const queue = [
    promisify(config.id),
    promisify(config.disabled)
  ]

  if (shouldGaLoad() && (!window.ga || !noScript)) {
    queue.push(
      loadScript(resource).catch(() => {
        throw new Error (
          '[vue-analytics] An error occured! Please check your connection, ' +
          'if you have any Google Analytics blocker installed in your browser ' +
          'or check your custom resource URL if you have added any.'
        )
      })
    )
  }

  return Promise.all(queue).then(response => {
    update({
      id: response[0],
      disabled: response[1]
    })

    // Opt-in/opt-out #gdpr
    noga(config.disabled)

    // Creates necessary trackers
    createTrackers()

    // Fires all shorthand fields in the options
    collectors()

    // Fires all untracked event that have been fired
    // meanwhile GoogleAnalayitcs script was loading
    untracked()

    // Starts auto tracking
    autoTracking()

    ready()
  }).catch(error => {
    if (!config.debug.enabled) {
      return
    }

    console.error(error.message)
  })
}
