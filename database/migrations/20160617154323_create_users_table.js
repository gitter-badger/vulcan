export const up = ({ schema, raw, fn }) => schema.createTable('users', (table) => {
  table.increments('id').primary()
  table.string('email').notNullable().unique().index()
  table.string('password').notNullable()
  table.timestamp('created_at').notNullable().defaultsTo(fn.now())
  table.timestamp('updated_at').notNullable().defaultsTo(fn.now())
  table.timestamp('deleted_at').nullable().defaultTo(raw('NULL'))
})

export const down = ({ schema }) => schema.dropTable('users')
