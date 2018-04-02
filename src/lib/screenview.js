import query from 'lib/query'

export default function screenview (...args) {
  const [screenName] = args

  if (args.length === 1 && typeof screenName === 'string') {
    return query('send', 'screenview', { screenName })
  }

  query('send', 'screenview', ...args)
}