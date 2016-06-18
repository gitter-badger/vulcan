require('babel-core/register')()
require('app-module-path').addPath(require('path').resolve(__dirname, '..'))
process.env.NODE_ENV = process.env.NODE_ENV || 'test'
