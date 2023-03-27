import S from 'fluent-json-schema'
export function users(fastify, opts, next) {
  fastify.route({
    method: 'GET',
    url: '/users',
    schema: {
      response: {
        200: S.object().prop(
          'users',
          S.array().items(
            S.object().prop('username', S.string()).required()
          )
        ),
      },
    },
    handler: async request => {
      const users = [{ username: 'john' }, { username: 'jane' }]
      request.log.info('GET /users')
      return { users }
    },
  })

  next()
}
