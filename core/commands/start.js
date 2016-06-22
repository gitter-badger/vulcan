import env from '@niftyco/env'
import server from 'core/server'

export const command = 'start'
export const description = 'start your app'
export const options = [{
  flags: '-p, --port [int]',
  description: 'the port the app will be running on',
  default: env.get('port', 1337)
}]

export const action = (done) => ({ port }) => {
  server.listen(port, () => {
    console.log(`Vulcan running on port ${port}`)
  })
}
