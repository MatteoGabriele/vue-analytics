import query from 'lib/query'

export default function event (...args) {
  query('send', 'event', ...args)
}
