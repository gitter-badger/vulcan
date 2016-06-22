import welcome from 'app/controllers/welcome'
import * as users from 'app/controllers/users'
import api from 'app/middleware/api'

export default function () {
  this.get('home', '/', welcome())
  this.resource('/users', api(), users)
}
