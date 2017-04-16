import ga from '../ga'

export default function exception (error, fatal = false) {
  ga('send', 'exception', {
    exDescription: error,
    exFatal: fatal
  })
}
