import { resolve } from 'path'

export default  {
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
  },
  seeds: {
    directory: resolve('database/seeds')
  },
  migrations: {
    directory: resolve('database/migrations'),
    tableName: 'migrations',
    extension: 'js'
  }
}
