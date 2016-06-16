import errorHandler from 'core/middleware/error-handler'
import { NotFoundError, BadRequestError } from 'core/errors'

export default function () {
  this.use(errorHandler(({ message }) => {
    if (message === 'EmptyResponse') {
      return new NotFoundError()
    }
    return new BadRequestError()
  }))
}
