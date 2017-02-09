import config from './config'
import { warn } from './utils'
import loadScript from './loadScript'
import autoTracking from './track/autoTracking'

export default function (router, callback) {
  if (config.manual) {
    return
  }

  if (!config.id) {
    const url = 'https://github.com/MatteoGabriele/vue-analytics#usage'
    warn('Please enter a Google Analaytics tracking ID', url)
    return
  }

  loadScript().then(function (response) {
    if (response.error) {
      warn('Ops! Could\'t load the Google Analytics script')
      return
    }

    if (callback && typeof callback === 'function') {
      callback()
    }

    autoTracking(router)
  })
}
