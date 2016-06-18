import { expect } from 'chai'
import request from 'supertest'
import cheerio from 'cheerio'
import server from 'core/server'

let app = null

describe('Vulcan Application', () => {
  describe('GET /', () => {
    before(() => {
      app = request(server.listen())
    })

    it(`should return "Hello World"`, (done) => {
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
    before(() => {
      app = request(server.listen())
    })

    it(`should return two users`, (done) => {
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
})
