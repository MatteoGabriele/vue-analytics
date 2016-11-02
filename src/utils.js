export const log = (text, type = 'normal') => {
  const general = 'padding: 10px 5px; line-height: 30px;'
  const normal = `${general} background: #ccc; color: #444444`
  const success = `${general} background: #219621; color: #ffffff`
  const error = `${general} background: #b9090b; color: #ffffff`
  const warning = `${general} background: #f1e05a; color: #333333`
  const types = { success, error, normal, warning }

  /* eslint-disable */

  console.log('')
  console.log(`%c [VueAnalytics] ${text} `, types[type])
  console.log('')

  /* eslint-enable */
}
