import S from 'fluent-json-schema'

export function user(fastify, opts, next) {
  fastify.route({
    method: 'GET',
    url: '/user',
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
