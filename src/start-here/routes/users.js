export function users(fastify, opts, next) {
  fastify.get('/users', async request => {
    const users = ['john', 'jane']
    request.log.info('GET /users')
    return { users }
  })

  next()
}
