import errors from 'http-errors'
import sql from '@nearform/sql'
import { S } from 'fluent-json-schema'

function userQuery(username) {
  return sql`SELECT * FROM users WHERE username = ${username}`
}

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
      const { rows } = await fastify.pg.query(userQuery(username))
      if (rows.length === 0) {
        throw errors.Unauthorized()
      }
      request.log.info('POST /login')
      return { token: fastify.jwt.sign({ username }) }
    }
  )

  next()
}
