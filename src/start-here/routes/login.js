import errors from 'http-errors'
import { S } from 'fluent-json-schema'

export default async function login(fastify, opts, next) {
  fastify.post(
    '/login',
    {
      schema: {
        body: S.object()
          .prop('username', S.string().required())
          .prop('password', S.string().required()),
        response: {
          200: S.object().prop('token', S.string()),
        },
      },
    },
    async request => {
      const { username, password } = request.body
      if (username !== password) {
        throw errors.Unauthorized()
      }
      request.log.info('POST /login')
      return { token: fastify.jwt.sign({ username }) }
    }
  )

  next()
}
