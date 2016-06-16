export default () => function * (next) {
  const start = Date.now()
  yield next
  const delta = Math.ceil(Date.now() - start)
  this.set('X-Response-Time', `${delta}ms`)
}
