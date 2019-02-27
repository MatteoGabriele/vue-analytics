import query from 'lib/query'

const getMethod = function (name) {
  return `${enhancedFeaturesList.includes(name) ? 'ec' : 'ecommerce'}:${name}`
}

const enhancedFeaturesList = [
  'addProduct',
  'addImpression',
  'setAction',
  'addPromo'
]

const featuresList = [
  'addItem',
  'addTransaction',
  'send',
  ...enhancedFeaturesList
]

export default featuresList.reduce((coll, feature) => {
  return {
    ...coll,
    [feature]: (...args) => {
      query(getMethod(feature), ...args)
    }
  }
}, {})