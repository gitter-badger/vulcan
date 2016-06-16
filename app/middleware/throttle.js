import { EnhanceYourCalmError } from 'core/errors'

const db = {}

const limiter = ({ req, max, decay, multiplier }) => {
  if (req.reset > Date.now()) {
    req.remaining = (req.remaining <= 0 ? 0 : (req.remaining - 1))
  }

  if (req.remaining <= 0 && req.reset < Date.now()) {
    req.remaining = max
    req.reset = Date.now() + (multiplier * decay)
  }

  return { used: req.remaining, remaining: req.remaining - 1, reset: req.reset }
}

export default ({ max = 60, decay = 1, multiplier = 60000 } = {}) => function * (next) {
  if (!this.ip) {
    return yield next
  }

  max = parseInt(max, 10)
  decay = parseInt(decay, 10)

  if (!db.hasOwnProperty(this.ip)) {
    db[this.ip] = { used: 0, remaining: max + 1, reset: Date.now() + (multiplier * decay) }
  }

  const limit = limiter({ req: db[this.ip], max, decay, multiplier })

  this.set('X-RateLimit-Limit', max)
  this.set('X-RateLimit-Remaining', Math.max(0, limit.remaining))
  this.set('X-RateLimit-Reset', limit.reset)

  if (limit.used > 0) {
    return yield next
  }

  this.set('Retry-After', new Date(limit.reset).toUTCString())
  yield this.send(new EnhanceYourCalmError())
}
