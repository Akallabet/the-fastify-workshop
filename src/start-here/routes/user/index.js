import S from 'fluent-json-schema'

export default async function user(fastify, opts, next) {
  fastify.route({
    method: 'GET',
    url: '/',
    onRequest: fastify.authenticate,
    schema: {
      response: {
        200: S.object().prop(
          'user',
          S.object().prop('username', S.string().required())
        ),
      },
    },
    handler: async request => {
      request.log.info('GET /user')
      return { user: request.user }
    },
  })
  next()
}
