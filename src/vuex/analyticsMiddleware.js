import query from '../lib/query'
import lib from '../lib'

export default store => {
  store.subscribe((mutation, state) => {
    if (!mutation.payload || !mutation.payload.meta) {
      return
    }

    const { analytics } = mutation.payload.meta

    if (!Array.isArray(analytics)) {
      throw new Error('The "analytics" property needs to be an array')
    }

    analytics.forEach(event => {
      const type = event.shift()
      const props = event

      if (!(type in lib)) {
        throw new Error(`The type "${type}" doesn't exist.`)
      }

      lib[type](...props)
    })
  })
}
