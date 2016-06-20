import errorHandler from 'core/middleware/error-handler'
import { NotFoundError, BadRequestError } from 'core/errors'

export default function () {
  this.use(errorHandler((e) => {
    if (e.message === 'EmptyResponse') {
      return new NotFoundError()
    }
    return new BadRequestError(e.message)
  }))
}
