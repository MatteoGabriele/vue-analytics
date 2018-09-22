import config from './config'
import query from './lib/query'

export default () => {
  config.untracked.forEach(t => {
    query(t.m, ...t.a)
  })
}