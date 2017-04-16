import autoTrackPage from './page.auto'
import autoTrackException from './exception.auto'
import page from './page'
import event from './event'
import time from './time'
import set from './set'
import query from './query'
import exception from './exception'
import social from './social'
import gaRequire from './require'

export default {
  autoTrackPage,
  autoTrackException,
  social,
  page,
  event,
  time,
  exception,
  set,
  query,

  // require is already a used keyword in javascript
  // need to pass it in a different way or could export
  // the wrong function
  require: gaRequire
}
