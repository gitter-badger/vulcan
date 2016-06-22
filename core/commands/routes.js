import table, { getBorderCharacters } from 'table'
import server from 'core/server'

export const command = 'routes'
export const description = 'list all registered routes'

const config = {
  border: getBorderCharacters('norc'),
  drawHorizontalLine: (i, s) => (i === 0 || i === 1 || i === s)
}

const parseAction = (name, stack) => {
  const fn = stack[stack.length - 1].name || 'anonymous'
  return `${fn}()`
}

export const action = (done) => () => {
  const header = ['Name', 'Methods', 'Path', 'Action']
  const routes = server.stack.filter((layer) => layer.methods.length > 0)
    .map(({ name, methods, path, stack }) => [name, methods.join(','), path, parseAction(name, stack)])

  console.log(table([header, ...routes], config))
  done()
}
