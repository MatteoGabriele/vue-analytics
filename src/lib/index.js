import event from './event'
import exception from './exception'
import page from './page'
import query from './query'
import require from './require'
import set from './set'
import social from './social'
import time from './time'
import ecommerce from './ecommerce'
import screenview from './screenview'
import config from '../config'
import noga from '../no-ga'
import bootstrap from '../bootstrap'

export default {
  event,
  exception,
  page,
  query,
  require,
  set,
  social,
  time,
  screenview,
  ecommerce,
  bootstrap,
  disable: () => noga(true),
  enable: () => noga(false),
  commands: config.commands
}
