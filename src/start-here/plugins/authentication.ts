import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import fp from 'fastify-plugin'

const authentication = fp(function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
): void {
  // Register jwt with secret provided in opts
  fastify.register(import('@fastify/jwt'), {
    secret: opts.JWT_SECRET,
  })
  //expose an authenticate function in the fastify instance

  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.send(err)
      }
    }
  )
})
export default authentication
