import { S } from 'fluent-json-schema'

export function login(fastify, opts, next) {
  fastify.post(
    '/login',
    {
      schema: {
        body: S.object()
          .prop('username', S.string().required())
          .prop('password', S.string().required()),
      },
    },
    async request => {
      const { username, password } = request.body
      request.log.info('POST /login')
      return { username, password }
    }
  )

  next()
}
