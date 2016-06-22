import Router from 'koa-router'

const build = (router, resource, { list, create, show, update, destroy }) => {
  const prefix = resource.slice(1)
  router.param('id', function * (val, next) {
    this.params.id = parseInt(val, 10)
    yield next
  })

  list && router.get(`${prefix}.list`, '/', list)
  create && router.post(`${prefix}.create`, '/', create)
  show && router.get(`${prefix}.show`, '/:id([0-9]+)', show)
  update && router.put(`${prefix}.update`, '/:id([0-9]+)', update)
  destroy && router.delete(`${prefix}.destroy`, '/:id([0-9]+)', destroy)

  return router
}

export default function (resource, ...middleware) {
  const router = new Router({ prefix: `${resource}` })
  const controller = middleware.pop()

  return this.use(build(router.use(...middleware), resource, controller).routes())
}
