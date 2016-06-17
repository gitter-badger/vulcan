import { basename } from 'path'
import { db } from 'core/bookshelf'

export const command = 'db:migrate'
export const description = 'run database migrations'

export const action = (done) => () => {
  db.migrate.latest().spread((batch, migrations) => {
    if (migrations.length === 0) {
      console.log('Already up to date')
    } else {
      console.log(`Batch ${batch} ran ${migrations.length} migrations:`)
      migrations.map((file) => console.log(basename(file, '.js')))
    }
    done()
  })
}
