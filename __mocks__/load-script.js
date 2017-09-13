export default function () {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      window.ga = jest.fn()
      return resolve()
    })
  })
}
