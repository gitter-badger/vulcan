import { resolve } from 'path'
import Config from '@niftyco/config'
import env from '@niftyco/env'

export default new Config(resolve('app/config'), env.get('node_env', 'development'))
