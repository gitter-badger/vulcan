import { resolve } from 'path'

export default {
  client: 'sqlite3',
  connection: {
    filename: resolve('database/test.db')
  }
}
