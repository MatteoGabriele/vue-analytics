import config, { getId } from './config'

export function noop () {}

export function loadScript (url) {
  return new Promise((resolve, reject) => {
    var head = document.head || document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.async = true
    script.src = url
    script.charset = 'utf-8'

    head.appendChild(script)

    script.onload = resolve
    script.onerror = reject
  })
}

export function getBasePath (base, path) {
  const pathAsArray = path.split('/')
  const baseAsArray = base.split('/')

  if (pathAsArray[0] === '' && base[base.length - 1] === '/') {
    pathAsArray.shift()
  }

  return baseAsArray.join('/') + pathAsArray.join('/')
}

export function merge (obj, src) {
  Object.keys(src).forEach(function (key) {
    const type = obj[key] && Object.prototype.toString.call(obj[key])

    if (type === '[object Object]' || type === '[object Array]') {
      merge(obj[key], src[key])
      return
    }
    obj[key] = src[key]
  })

  return obj
}

export function hasScript () {
  const scriptTags = Array.prototype.slice.call(
    document.getElementsByTagName('script')
  ).filter(script => {
    return (script.src.indexOf('analytics') !== -1) ||
      (script.src.indexOf('gtag') !== -1)
  })

  return scriptTags.length > 0
}

export function shouldGaLoad () {
  const {
    checkDuplicatedScript,
    disableScriptLoader
  } = config

  const requires = [
    Boolean(window && window.ga),
    (checkDuplicatedScript && !hasScript()),
    !disableScriptLoader
  ]

  return requires.some(Boolean)
}

export function getTracker (tracker) {
  return tracker.name || tracker.replace(/-/gi, '')
}

export function onAnalyticsReady () {
  return new Promise((resolve, reject) => {
    const poll = setInterval(() => {
      if (typeof window === 'undefined' || !window.ga) {
        return
      }

      resolve()
      clearInterval(poll)
    }, 10)
  })
}

export function getMethod (name, trackerId) {
  if (getId().length > 1) {
    const domain = getTracker(trackerId)
    return `${domain}.${name}`
  }

  return name
}

export function getQueryString (queryMap) {
  const queryString = Object.keys(queryMap)
    .reduce((string, key, index, keys) => {
      const isLastKey = index === (keys.length - 1)
      const value = queryMap[key]

      if (value == null) {
        return string
      }

      string += `${key}=${value}${isLastKey ? '' : '&'}`
      return string
    }, '')

  return queryString !== '' ? `?${queryString}` : ''
}

export function isRouteIgnored ({ name, path }) {
  return [name, path]
    .filter(Boolean)
    .find(value => config.ignoreRoutes.indexOf(value) !== -1)
}

export function isRoute (data) {
  return data.query && data.params
}

export function isRouter (data) {
  return data.currentRoute
}

export const promisify = value => {
  if (value.then) {
    return value
  }

  if (typeof value === 'function') {
    const payload = value()

    return payload.then ? payload : Promise.resolve(payload)
  }

  return Promise.resolve(value)
}
