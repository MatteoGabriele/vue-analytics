import query from 'lib/query'

export default function set (...args) {
  if (typeof args[0] === 'object' && args[0].constructor === Object) {
    query('set', args[0])
    return
  }

  if (args.length < 2 || (typeof args[0] !== 'string' && typeof args[1] !== 'string')) {
    throw new Error(
      '[vue-analytics] $ga.set needs a field name and a field value, or you can pass an object literal'
    )
  }

  // field name and field value
  query('set', args[0], args[1])
}
