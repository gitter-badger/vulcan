import Promise from 'bluebird'
import morgan from 'morgan'

export default (format, options) => function * (next) {
  const logger = Promise.promisify(morgan(format, options))
  yield logger(this.req, this.res)
  yield next
}
