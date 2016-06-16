import helloWorld from 'app/controllers/hello-world'
import * as users from 'app/controllers/users'
import api from 'app/middleware/api'

export default function () {
  this.get('/', api(), helloWorld())
  this.resource('/users', api(), users)
}
