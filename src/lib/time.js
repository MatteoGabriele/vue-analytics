import query from 'lib/query'
import { getTrackerName } from './../config'

export default function time (...args) {
  const trackerName = getTrackerName()
  const command = trackerName ? `${trackerName}.send` : 'send'

  query(command, 'timing', ...args)
}
