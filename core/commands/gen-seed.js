import { resolve } from 'path'
import { writeFileSync } from 'fs'
import { upperFirst } from 'lodash'

export const command = 'gen:seed <model>'
export const description = 'create a new seed file'

const template = (Model) => `import Promise from 'bluebird'
import ${upperFirst(Model)} from 'app/models/${Model.toLowerCase()}'

export const seed = (table) => Promise.all([
  table.raw(\`truncate table \${${Model}.prototype.tableName} restart identity cascade\`),
  ${Model}.create([{
    field: 'value_2'
  }, {
    field: 'value_1'
  }])
])
`

export const action = (done) => (model, { table }) => {
  const filename = `${model.toLowerCase()}.js`
  writeFileSync(resolve(`database/seeds/${filename}`), template(model))
  console.log(`Created ${filename}`)
  done()
}
