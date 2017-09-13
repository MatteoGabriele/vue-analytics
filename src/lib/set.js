import query from 'lib/query'

export default function set (...args) {
  if (typeof args[0] === 'object' && args[0].constructor === Object) {
    query('set', args[0])
    return
  }

  query('set', args[0], args[1])
}
