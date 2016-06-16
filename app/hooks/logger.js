import logger from 'koa-logger'

export default function () {
  if (process.env.NODE_ENV !== 'production') {
    this.use(logger())
  }
}
