import ga from '../ga'

/**
 * Exception Tracking
 * @param  {Error}  error
 * @param  {Boolean} [fatal=false]
 */
export default function exception (error, fatal = false) {
  ga('send', 'exception', {
    exDescription: error,
    exFatal: fatal
  })
}
