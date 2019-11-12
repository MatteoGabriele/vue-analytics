import _require from './lib/require'
import set from './lib/set'
import config from './config'

export const setters = function () {
  config.set.forEach(({ field, value }) => {
    if (typeof field === 'undefined' || typeof value === 'undefined') {
      throw new Error(
        '[vue-analytics] Wrong configuration in the plugin options.\n' +
        'The "set" array requires each item to have a "field" and a "value" property.'
      )
    }

    set(field, value)
  })
}

export const requires = function () {
  const ecommerce = ['ec', 'ecommerce']

  config.require.forEach(value => {
    if (ecommerce.indexOf(value) !== -1 || ecommerce.indexOf(value.name) !== -1) {
      throw new Error(
        '[vue-analytics] The ecommerce features are built-in in the plugin. \n' +
        'Follow the ecommerce instructions available in the documentation.'
      )
    }

    if (typeof value !== 'string' && typeof value !== 'object') {
      throw new Error(
        '[vue-analytics] Wrong configuration in the plugin options. \n' +
        'The "require" array requires each item to be a string or to have a "name" and an "options" property.'
      )
    }

    const pluginName = value.name || value

    if (value.options) {
      _require(pluginName, value.options)
      return
    }

    _require(pluginName)
  })
}

export default function () {
  setters()
  requires()
}