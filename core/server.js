import { resolve } from 'path'
import { readdirSync } from 'fs'
import koa from 'koa'
import Router from 'koa-router'
import config from 'core/config'
import resource from 'core/resource'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import conditionalGet from 'koa-conditional-get'
import eTag from 'koa-etag'
import compress from 'koa-compress'
import helmet from 'koa-helmet'
import responseTime from 'core/middleware/response-time'
import sender from 'core/middleware/sender'
import noSlash from 'core/middleware/no-slash'
import routes from 'app/routes'

const app = koa()
const router = new Router()

router.resource = resource.bind(router)

routes.call(router)

app.use(responseTime())
app.use(noSlash())
app.use(conditionalGet())
app.use(eTag())
app.use(bodyParser())
app.use(helmet())
app.use(cors())
app.use(sender())

readdirSync(resolve('app/hooks'))
  .map((file) => require(resolve(`app/hooks/${file}`)))
  .map((hook) => hook.call(app))

app.use(router.routes())
app.use(router.allowedMethods())

export default app
