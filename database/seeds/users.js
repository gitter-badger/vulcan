import Promise from 'bluebird'
import faker from 'faker'
import User from 'app/models/user'

export const seed = (db) => Promise.all([
  User.create([{
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password()
  }, {
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password()
  }])
])
