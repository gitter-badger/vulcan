import statuses from 'statuses'
import { camelCase, upperFirst } from 'lodash'

// We like to enhance calmness.
statuses['420'] = 'Enhance Your Calm'

const STATUS_CODES = {
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a Teapot',
  420: 'Enhance Your Calm',
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  425: 'Unordered Collection',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  440: 'Login Timeout',
  444: 'No Response',
  449: 'Retry With',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficent Storage',
  508: 'Loop Detected',
  509: 'Bandwidth Limit Exceeded',
  510: 'Not Extended',
  511: 'Network Authentication Required'
}

export function HttpError (message, identifier = 'E_HTTPERROR', statusCode = 400) {
  Error.call(this, message)
  this.message = message
  this.identifier = identifier
  this.statusCode = statusCode
}

HttpError.prototype = Object.create(Error.prototype)

Object.keys(STATUS_CODES)
  .map((code) => {
    const message = STATUS_CODES[code]
    const identifier = `E_${camelCase(message).toUpperCase()}`
    const error = `${upperFirst(camelCase(message))}Error`

    exports[error] = function (msg, id) {
      HttpError.call(this, msg || message, id || identifier, parseInt(code, 10))
    }
    exports[error].prototype = Object.create(HttpError.prototype)
  })
