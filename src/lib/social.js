import query from 'lib/query'

export default function social (...args) {
  query('send', 'social', ...args)
}
