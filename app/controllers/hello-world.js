export default () => function * () {
  return yield this.send({ hello: 'world' })
}
