import { loadScript } from './helpers'
import config, { update } from './config'
import createTrackers from './create-trackers'
import collectors from './collectors'
import { autoTracking } from 'lib/page'

export default () => {
  if (typeof document === 'undefined') {
    return
  }

  const { wait, id, debug, disableScriptLoader } = config
  const filename = debug.enabled ? 'analytics_debug' : 'analytics'
  const resource = `https://www.google-analytics.com/${filename}.js`

  if (!id) {
    throw new Error(
      '[vue-analytics] Missing the "id" parameter. Add at least one tracking domain ID'
    )
  }

  if (!window.ga || !disableScriptLoader) {
    loadScript(resource).catch(() => {
      console.error(
        `[vue-analytics] An error occured trying to load ${resource}. Please check your connection.`
      )
    })
  }

  Promise.resolve(
    typeof id === 'function' ? id() : id
  ).then(newId => {
    update({ id: newId })
    createTrackers()
    collectors()
    autoTracking()
  })
}
