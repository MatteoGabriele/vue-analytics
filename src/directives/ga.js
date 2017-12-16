import config from '../config'

export default {
  inserted: function (el, { value }, vnode) {
    el.addEventListener('click', function () {
      let fn = typeof value === 'string' 
        ? config.commands[value]
        : value

      if (!fn) {
        throw new Error('[vue-analytics] The value passed to v-ga is not defined in the commands list.')
      }

      fn.apply(vnode.context)
    })
  }
}