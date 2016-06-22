import { resolve } from 'path'
import { writeFileSync } from 'fs'
import { upperFirst } from 'lodash'
import { singularize, pluralize } from 'inflection'

export const command = 'gen:resource <model>'
export const description = 'create a resource for a model'

const template = (Model, model) => `import ${Model} from 'app/models/${model}'

export function * list () {
  const ${pluralize(model)} = yield ${Model}.all()
  return yield this.send({ ${pluralize(model)} })
}

export function * create () {
  const ${model} = yield ${Model}.create(this.request.body)

  return yield this.send({ ${model} }, 201)
}

export function * show () {
  const ${model} = yield ${Model}.find(this.params.id)

  return yield this.send({ ${model} })
}

export function * update () {
  const ${model} = yield ${Model}.find(this.params.id)
  yield ${model}.save(this.request.body, { patch: true })

  return yield this.send({ ${model} })
}

export function * destroy () {
  const ${model} = yield ${Model}.find(this.params.id)
  yield ${model}.destroy()

  return yield this.send({}, 204)
}
`

export const action = (done) => (resource) => {
  const model = singularize(resource.toLowerCase())
  const Model = upperFirst(model)
  const filename = `${pluralize(model)}.js`
  writeFileSync(resolve(`app/controllers/${filename}`), template(Model, model))
  console.log(`Created ${pluralize(model)} resource`)
  done()
}
