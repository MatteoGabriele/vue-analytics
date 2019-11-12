import query from './query'

export default function social (...args) {
  query('send', 'social', ...args)
}
