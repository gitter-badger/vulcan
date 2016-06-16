import compose from 'koa-compose'
import throttle from 'app/middleware/throttle'

export default () => compose([
  throttle({ max: 60 })
])
