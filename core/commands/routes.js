import table, { getBorderCharacters } from 'table'
import server from 'core/server'

export const command = 'routes'
export const description = 'list all registered routes'

const config = {
  border: getBorderCharacters('norc'),
  drawHorizontalLine: (i, s) => (i === 0 || i === 1 || i === s)
}

const parsePath = (path) => (path !== '/' && /\/$/.test(path)) ? path.slice(0, path.length - 1) : path

const parseAction = (name, stack) => `${stack[stack.length - 1].name || 'anonymous'}()`

export const action = (done) => () => {
  const header = ['Name', 'Method(s)', 'Path', 'Action']
  const routes = server.stack.filter((layer) => layer.methods.length > 0)
    .map(({ name, methods, path, stack }) => [name, methods.join(','), parsePath(path), parseAction(name, stack)])

  console.log(table([header, ...routes], config))
  done()
}
