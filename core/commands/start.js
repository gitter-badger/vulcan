import server from 'core/server'

export default (arg) => (opts) => {
  server.listen(opts.port, () => {
    console.log(`Vulcan running on port ${opts.port}`)
  })
}
