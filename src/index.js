const event = (category, action, label = '', value = '') => {
  if (!hasGoogleAnalytics()) {
    return
  }

  window.ga('send', 'event', category, action, label, value)
}

const page = (path) => {
  if (!hasGoogleAnalytics()) {
    return
  }

  window.ga('send', 'page-view', path)
}

const hasGoogleAnalytics = () => {
  return (typeof window.ga !== 'undefined')
}

const install = (Vue, options = {}) => {
  const { router } = options

  Vue['$track'] = { event, page }

  if (router) {
    router.afterEach(({ path }) => {
      Vue.$track.page(path)
    })
  }
}

export default { install }
