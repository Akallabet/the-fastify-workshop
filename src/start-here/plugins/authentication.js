import fp from 'fastify-plugin'

const authentication = fp(function (fastify, opts, next) {
  // Register jwt with secret provided in opts
  fastify.register(import('@fastify/jwt'), {
    secret: opts.JWT_SECRET,
  })
  //expose an authenticate function in the fastify instance

  fastify.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
  next()
})
export default authentication
