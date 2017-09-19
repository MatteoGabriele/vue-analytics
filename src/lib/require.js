import query from 'lib/query'

export default function (...args) {
  if (args.length == 2) {
    query('require', args[0], args[1])
    return
  }

  query('require', args[0])
}
