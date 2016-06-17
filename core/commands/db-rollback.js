import { basename } from 'path'
import { db } from 'core/bookshelf'

export const command = 'db:rollback'
export const description = 'rollback the latest database migrations'

export const action = (done) => () => {
  db.migrate.rollback().spread((batch, migrations) => {
    if (migrations.length === 0) {
      console.log('Already at base migration')
    } else {
      console.log(`Batch ${batch} ran ${migrations.length} migrations:`)
      migrations.map((file) => console.log(basename(file, '.js')))
    }
    done()
  })
}
