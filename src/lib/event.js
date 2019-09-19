import query from 'lib/query'
import { getTrackerName } from './../config'

export default function event (...args) {
  const trackerName = getTrackerName()
  const command = trackerName ? `${trackerName}.send` : 'send'

  query(command, 'event', ...args)
}
