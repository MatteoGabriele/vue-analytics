import config, { getId } from '../config'
import { getMethod } from '../helpers'

export default function query (method, ...args) {
  getId().forEach(function (id) {
    window.ga(getMethod(method, id), ...args)
  })
}
