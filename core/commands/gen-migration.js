import { resolve } from 'path'
import { writeFileSync } from 'fs'
import moment from 'moment'

export const command = 'gen:migration <name>'
export const description = 'create a new migration'
export const options = [{
  flags: '-t, --table [name]',
  description: 'table to predefine the migration with'
}]

const template = (table = 'table') => `export const up = ({ schema, raw, fn }) => schema.createTable('${table}', (table) => {
  table.increments('id').primary()
  table.timestamp('created_at').notNullable().defaultsTo(fn.now())
  table.timestamp('updated_at').notNullable().defaultsTo(fn.now())
  table.timestamp('deleted_at').nullable().defaultTo(raw('NULL'))
})

export const down => ({ schema }) => schema.dropTable('${table}')
`

export const action = (done) => (name, { table }) => {
  const filename = `${moment().format('YYYYMMDDHHmmss')}_${name}.js`
  writeFileSync(resolve(`database/migrations/${filename}`), template(table))
  console.log(`Created ${filename}`)
  done()
}
