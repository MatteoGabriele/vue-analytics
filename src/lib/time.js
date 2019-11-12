import query from './query'

export default function time (...args) {
  query('send', 'timing', ...args)
}
