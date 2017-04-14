import ga from '../ga'

/**
 * Time tracking
 * @param  {any} args
 * @example
 * $ga.trackTime('category', 'variable', 1, 'label')
 *
 * $ga.trackTime({
 *  timingCategory: 'category',
 *  timingVar: 'variable',
 *  timingValue: 1,
 *  timingLabel: 'label'
 * })
 */
export default function time (...args) {
  ga('send', 'timing', ...args)
}
