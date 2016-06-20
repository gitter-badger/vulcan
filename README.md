<div align="center">
  <img src="http://i.imgur.com/oYGzAXZ.png">
  <br><br>
  <a href="http://standardjs.com"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat"></a> <a href="https://coveralls.io/github/aniftyco/vulcan"><img src="https://img.shields.io/coveralls/aniftyco/vulcan.svg"></a> <a href="https://github.com/aniftyco/vulcan/releases"><img src="https://img.shields.io/github/release/aniftyco/vulcan.svg"></a> <a href="https://github.com/aniftyco/vulcan/releases"><img src="https://img.shields.io/github/downloads/aniftyco/vulcan/total.svg"></a> <a href="https://github.com/aniftyco/vulcan/blob/master/LICENSE"><img src="https://img.shields.io/github/license/aniftyco/vulcan.svg"></a>
</div>

## Install
```sh
$ git clone https://github.com/aniftyco/vulcan.git my-app
$ cd my-app
$ npm install
```

## Getting Started
After npm installs, you can open up `app/config/db.js` to edit your database connection details. Vulcan uses Bookshelf and Knex for Models and database stuff. You can use database that they accept. By default Vulcan has `pg` installed to run Postgres but you can install any other adapter and use that.

After that you can run `node vulcan db:migrate` to migrate the database and then `node vulcan db:seed` to run seed generation that will insert a few records for you.

Finally run `npm start` and you should see Vulcan start up on port `1337`. Open `http://localhost:1337` in your browser and you should see `Hello World`.
