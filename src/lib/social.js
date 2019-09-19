import query from 'lib/query'
import { getTrackerName } from '../config'

export default function social (...args) {
  const trackerName = getTrackerName()
  const command = trackerName ? `${trackerName}.send` : 'send'

  query(command, 'social', ...args)
}
