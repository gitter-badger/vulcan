import { resolve } from 'path'
import { readdirSync } from 'fs'
import env from '@niftyco/env'
import koa from 'koa'
import Router from 'koa-router'
import views from 'koa-views'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import conditionalGet from 'koa-conditional-get'
import eTag from 'koa-etag'
import compress from 'koa-compress'
import helmet from 'koa-helmet'
import methodOverride from 'koa-methodoverride'
import config from 'core/config'
import resource from 'core/resource'
import logger from 'core/middleware/logger'
import responseTime from 'core/middleware/response-time'
import sender from 'core/middleware/sender'
import noSlash from 'core/middleware/no-slash'
import routes from 'app/routes'

const app = koa()
const router = new Router()

app.name = config.get('app.name', 'vulcan-app')
app.env = env.get('node_env', 'development')
app.proxy = config.get('app.proxy', false)
app.subdomainOffset = config.get('app.subdomainOffset', 2)

router.resource = resource.bind(router)

routes.call(router)

app.use(responseTime())
if (config.get('logs.enabled', true)) {
  app.use(logger(config.get('logs.format'), config.get('logs.options')))
}
app.use(methodOverride('_method'))
app.use(views(resolve('app/views'), config.get('app.views')))
app.use(noSlash())
app.use(conditionalGet())
app.use(eTag())
app.use(compress())
app.use(bodyParser())
app.use(helmet())
app.use(cors())
app.use(sender())

readdirSync(resolve('app/hooks'))
  .map((file) => require(resolve(`app/hooks/${file}`)))
  .map((hook) => hook.call(app))

app.use(router.routes())
app.use(router.allowedMethods())

app.stack = router.stack

export default app
