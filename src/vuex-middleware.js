import lib from './lib'

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
      let method
      let type = event.shift()

      const props = event

      if (type.includes(':')) {
        [type, method] = type.split(':')
      }

      if (!(type in lib)) {
        throw new Error(
          `[vue-analytics:vuex] The type "${type}" doesn't exist.`
        )
      }

      if (method && !(method in lib[type])) {
        throw new Error(
          `[vue-analytics:vuex] The type "${type}" has not method "${method}".`
        )
      }

      if (type === 'ecommerce' && !method) {
        throw new Error(
          `[vue-analytics:vuex] The type "${type}" needs to call a method. Check documentation.`
        )
      }

      if (method) {
        lib[type][method](...props)
      } else {
        lib[type](...props)
      }
    })
  })
}
