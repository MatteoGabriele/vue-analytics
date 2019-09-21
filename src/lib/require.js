import query from 'lib/query'
import { getTrackerName } from '../config'

export default function (...args) {
  const trackerName = getTrackerName()
  const command = trackerName ? `${trackerName}.require` : 'require'

  if (args.length == 2) {
    query(command, args[0], args[1])
    return
  }

  query(command, args[0])
}
