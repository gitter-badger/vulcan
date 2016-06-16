import Promise from 'bluebird'
import { compare, hash } from 'bcrypt'
import { first } from 'lodash'
import { Model } from 'core/bookshelf'

export default Model.extend({
  tableName: 'users',
  hidden: ['createdAt', 'updatedAt', 'deletedAt', 'password'],
  initialize () {
    this.on('creating', (...args) => this.hashPassword(...args))
  },
  hashPassword (model, attrs, opts) {
    return new Promise((resolve, reject) => {
      hash(model.get('password'), 10, (err, hash) => {
        if (err) {
          return reject(err)
        }
        model.set('password', hash)
        return resolve(model)
      })
    })
  }
})
