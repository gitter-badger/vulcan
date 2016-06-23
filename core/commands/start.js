import { repeat } from 'lodash'
import chalk from 'chalk'
import env from '@niftyco/env'
import config from 'core/config'
import { logo } from 'core/vulcan'
import app from 'core/server'

export const command = 'start'
export const description = 'start your app'
export const options = [{
  flags: '-p, --port [int]',
  description: 'the port the app will be running on',
  default: env.get('port', config.get('app.port', 1337))
}, {
  flags: '-B, --no-banner',
  description: "don't show the banner"
}]

export const action = (done) => ({ port, banner }) => {
  const timeout = 30000
  const server = app.listen(port, () => {
    if (banner) {
      console.log(logo)
      console.log(`  ${repeat('-', 80)}\n`)
    }
    console.log(`  Started ${chalk.gray(config.get('app.name', 'your app'))} in ${chalk.cyan(env.get('node_env', 'development'))} mode at ${chalk.yellow(process.cwd())}`)
    console.log(`  You can view it by going to ${chalk.blue(`http://localhost:${port}`)} in your browser.`)
    console.log(`  Press ${chalk.cyan('<CTRL> + <C>')} at any time to shut down Vulcan server.\n`)
  })

  process.on('SIGINT', () => {
    console.log(`\n  ${chalk.red('Shutting down server.')}\n`)
    server.close((e) => process.exit(1))

    setTimeout(() => {
      console.log(`  ${chalk.red(`Could not close server in time (${timeout}ms), forcefully shutting down.`)}\n`)
      process.exit(1)
    }, timeout).unref()
  })
}
