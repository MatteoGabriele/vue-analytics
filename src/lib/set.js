import query from 'lib/query'
import { getTrackerName } from './../config'

export default function set (...args) {
  const trackerName = getTrackerName()
  const command = trackerName ? `${trackerName}.set` : 'set'

  if (typeof args[0] === 'object' && args[0].constructor === Object) {
    query(command, args[0])
    return
  }

  query(command, args[0], args[1])
}
