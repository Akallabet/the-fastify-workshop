export function users(fastify, opts, next) {
  fastify.get('/users', async () => {
    return { users: ['john', 'jane'] }
  })

  next()
}
