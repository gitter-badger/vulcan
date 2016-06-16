import { resolve } from 'path'
import Config from '@niftyco/config'

export default new Config(resolve('app/config'), process.env.NODE_ENV || 'development')
