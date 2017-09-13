import query from 'lib/query'

export default function time (...args) {
  query('send', 'timing', ...args)
}
