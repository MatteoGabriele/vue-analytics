import set from 'lib/set'
import config from './config'

export default function addSetters () {
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