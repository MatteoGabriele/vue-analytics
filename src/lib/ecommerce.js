import query from 'lib/query'
import config from '../config'

const getMethod = function (name) {
  return `${config.ecommerce.enhanced ? 'ec' : 'ecommerce'}:${name}`
}

const featuresList = [
  'addItem', 
  'addTransaction', 
  'addProduct', 
  'addImpression', 
  'setAction',
  'addPromo',
  'send'
]

export default featuresList.reduce((coll, feature) => {
  return {
    ...coll,
    [feature]: (...args) => {
      query(getMethod(feature), ...args)
    }
  }
}, {})