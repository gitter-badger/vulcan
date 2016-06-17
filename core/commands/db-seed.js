import { basename } from 'path'
import { db } from 'core/bookshelf'

export const command = 'db:seed'
export const description = 'seed the database with records'

export const action = (done) => () => {
  db.seed.run().spread((seeds) => {
    if (seeds.length === 0) {
      console.log('No seed files exist')
    } else {
      console.log(`Ran ${seeds.length} seed files:`)
      seeds.map((file) => console.log(basename(file, '.js')))
    }
    done()
  })
}
