import { loadScript, shouldGaLoad } from './helpers'
import config, { update } from './config'
import createTrackers from './create-trackers'
import collectors from './collectors'
import { autoTracking } from 'lib/page'
import noga from './no-ga'

export default () => {
  if (typeof document === 'undefined') {
    return
  }

  const { wait, id, disabled, debug, disableScriptLoader } = config
  const filename = debug.enabled ? 'analytics_debug' : 'analytics'
  const resource = `https://www.google-analytics.com/${filename}.js`

  if (!id) {
    throw new Error(
      '[vue-analytics] Missing the "id" parameter. Add at least one tracking domain ID'
    )
  }

  if (shouldGaLoad() && (!window.ga || !disableScriptLoader)) {
    loadScript(resource).catch(() => {
      console.error(
        `[vue-analytics] An error occured trying to load ${resource}. Please check your connection ` +
        `or if you have any Google Analytics blocker installed in your browser.`
      )
    })
  }

  Promise.resolve(
    (typeof id === 'function') ? id() : id
  ).then(newId => {
    update({ id: newId })
  }).then(() => {
    return (typeof disabled === 'function') ? disabled() : disabled
  }).then(disableTracking => {
    update({ disabled: disableTracking })

    if (disableTracking) {
      noga()
    }

    createTrackers()
    collectors()
    autoTracking()
  })
}
