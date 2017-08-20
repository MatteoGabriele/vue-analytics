import query from 'lib/query'
import config from '../config'

export default function untracked () {
  const { untracked, autoTracking } = config
  let utrackedLen = untracked.length

  if (!utrackedLen || !autoTracking.untracked) {
    return
  }

  while (utrackedLen--) {
    const item = untracked[utrackedLen]
    query(item.method, ...item.arguments)
    untracked.splice(utrackedLen, 1)
  }
}
