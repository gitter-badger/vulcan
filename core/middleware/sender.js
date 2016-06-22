import { HttpError } from 'core/errors'

const response = (ctx, body = {}, statusCode = 200) => {
  ctx.status = statusCode
  ctx.body = body
}

const error = (ctx, error) => {
  return response(ctx, { error }, error.statusCode)
}

const send = function * (data, statusCode = 200) {
  if (data instanceof HttpError) {
    return error(this, data)
  } else {
    return response(this, { data }, statusCode)
  }
}

export default (prop = 'send') => function * (next) {
  this[prop] = send.bind(this)
  yield next
}
