import Promise from 'bluebird'
import knex from 'knex'
import { defaultsDeep, isArray, isNumber, reduce, camelCase, snakeCase } from 'lodash'
import config from 'core/config'

const knexConfig = {
  client: config.get('db.driver', 'pg'),
  debug: config.get('app.debug', false),
  connection: config.get('db.connection'),
  seeds: config.get('db.seeds'),
  migrations: config.get('db.migrations')
}
const db = knex(knexConfig)
const bookshelf = require('bookshelf')(db)
const proto = bookshelf.Model.prototype

bookshelf.plugin('visibility')
bookshelf.plugin('virtuals')
bookshelf.plugin('pagination')
bookshelf.plugin(require('bookshelf-paranoia'))

const Model = bookshelf.Model.extend({
  hasTimestamps: ['created_at', 'updated_at', 'deleted_at'],
  softDelete: true,
  paginate (limit = 10, offset = 0) {
    return this.fetchPage({ limit, offset }).then((res) => res.models)
  },
  parse (attrs) {
    return reduce(attrs, (memo, val, key) => {
      memo[camelCase(key)] = val
      return memo
    }, {})
  },
  format (attrs) {
    return reduce(attrs, (memo, val, key) => {
      memo[snakeCase(key)] = val
      return memo
    }, {})
  },
  serialize (options) {
    return proto.serialize.call(this, Object.assign(options || {}, { omitPivot: true }))
  }
}, {
  create (record, options) {
    if (isArray(record)) {
      return this.createMany(record, options)
    }
    return this.forge(record)
      .save(null, options)
  },
  createMany (records, options) {
    return Promise.resolve(records)
      .each((record) => this.create(record, options))
  },
  where (filter) {
    return this.forge()
      .where(defaultsDeep({}, filter))
  },
  all (filter, options) {
    return this.forge()
      .where(defaultsDeep({}, filter))
      .fetchAll(options)
      .then((collection) => collection.models)
  },
  findOne (query, options) {
    return this.forge(query)
      .fetch(defaultsDeep({ require: true }, options))
  },
  findById (id, options) {
    return this.findOne({ [this.prototype.idAttribute]: id }, options)
  },
  find (query, options) {
    if (isNumber(query)) {
      return this.findById(Number(query), options)
    }
    return this.where(query).fetch(options)
  },
  paginate (limit = 10, offset = 0) {
    return this.fetchPage({ limit, offset })
      .then((res) => res.models)
  }
})

export {
  db, bookshelf, Model
}
