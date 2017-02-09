import config from './config'
import set from './set'

export default function () {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    const options = config.userId || {}
    const debugSource = config.debug.enabled ? '_debug' : ''
    const source = `https://www.google-analytics.com/analytics${debugSource}.js`
    const prior = document.getElementsByTagName('script')[0]

    script.async = 1
    prior.parentNode.insertBefore(script, prior)

    script.onload = script.onreadystatechange = function (_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = script.onreadystatechange = null
        script = undefined

        if (isAbort) {
          return reject({
            error: true,
            id: config.id
          })
        }

        if (config.debug.enabled) {
          window.ga_debug = {
            trace: config.debug.trace
          }
        }

        window.ga('create', config.id, 'auto', options)

        if (!config.debug.sendHitTask) {
          set('sendHitTask', null)
        }

        window.ga('send', 'pageview')

        resolve({
          success: true,
          id: config.id
        })
      }
    }

    script.src = source
  })
}
