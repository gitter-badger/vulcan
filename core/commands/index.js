import { readdirSync } from 'fs'
import { resolve } from 'path'

export default readdirSync(resolve('core/commands'))
  .filter((file) => !file.startsWith('index'))
  .map((file) => require(resolve(`core/commands/${file}`)))
