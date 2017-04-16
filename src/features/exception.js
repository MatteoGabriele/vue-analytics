import ga from '../ga'

/**
 * Exception Tracking
 * @param  {Error}  error
 * @param  {Boolean} [fatal=false]
 * try {
 *  // something that might not work
 * } catch (error) {
 *  $ga.exception(error.message)
 * }
 */
export default function exception (error, fatal = false) {
  ga('send', 'exception', {
    exDescription: error,
    exFatal: fatal
  })
}
