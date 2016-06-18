import logger from 'koa-logger'

export default function () {
  if (!~['production', 'test'].indexOf(process.env.NODE_ENV)) {
    this.use(logger())
  }
}
