import { resolve } from 'path'
import { writeFileSync } from 'fs'
import { singularize, pluralize } from 'inflection'

export const command = 'gen:model <table>'
export const description = 'create a new model'

const template = (table) => `import { Model } from 'core/bookshelf'

export default Model.extend({
  tableName: '${pluralize(table)}'
})
`

export const action = (done) => (table) => {
  const filename = `${singularize(table.toLowerCase())}.js`
  writeFileSync(resolve(`app/models/${filename}`), template(table.toLowerCase()))
  console.log(`Created ${table} model`)
  done()
}
