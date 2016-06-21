/* eslint-env mocha */
import { expect } from 'chai'
import request from 'supertest'
import cheerio from 'cheerio'
import { db } from 'core/bookshelf'
import server from 'core/server'

let app = null

describe('Vulcan Application', () => {
  before(() => {
    return db.migrate.latest()
      .then(() => db.seed.run())
      .then(() => {
        app = request(server.listen())
      })
  })

  describe('GET /', () => {
    it('should return Hello World', (done) => {
      app.get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .end((err, res) => {
          const $ = cheerio.load(res.text)
          expect(err).to.be.null
          expect($('body > h1').text()).to.equal('Hello World')
          done()
        })
    })
  })

  describe('GET /users', () => {
    it('should return two users', (done) => {
      app.get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body.error).to.be.undefined
          expect(res.body.data.users).to.not.be.empty
          expect(res.body.data.users).to.have.lengthOf(2)
          done()
        })
    })
  })

  describe('POST /users', () => {
    it('should create a user', () => {
      app.post('/users')
        .send({ email: 'test@test.com', password: 'test' })
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.data.user).to.not.be.empty
          expect(res.data.user.email).to.equal('test@test.com')
        })
    })
  })

  describe('GET /users/1', () => {
    it('should return the user with id #1', () => {
      app.get('/users/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body.error).to.be.undefined
          expect(res.body.data.user).to.be.an('object')
          expect(res.bodoy.data.users.email).to.not.be.empty
        })
    })
  })

  describe('PUT /users/3', () => {
    it('should update user #3', () => {
      app.put('/users/3')
        .send({ email: 'test@example.com' })
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body.error).to.be.undefined
          expect(res.body.data.user).to.be.an('object')
          expect(res.body.data.user.email).to.equal('test@example.com')
        })
    })
  })

  describe('DELETE /users/3', () => {
    it('should delete user #3', () => {
      app.delete('/users/3')
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body.data).to.be.empty()
        })
    })
  })
})
