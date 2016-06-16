export default (handler = defaultHandler) => function * (next) {
  try {
    yield next
  } catch (e) {
    yield this.send(handler(e))
  }
}
