import config from '../config'

export default {
  inserted: function (el, binding, vnode) {
    const events = Object.keys(binding.modifiers)

    if (events.length === 0) {
      events.push('click')
    }

    events.forEach(event => {
      el.addEventListener(event, function () {
        let fn = typeof binding.value === 'string'
          ? config.commands[binding.value]
          : binding.value

        if (!fn) {
          throw new Error('[vue-analytics] The value passed to v-ga is not defined in the commands list.')
        }

        fn.apply(vnode.context)
      })
    })
  }
}