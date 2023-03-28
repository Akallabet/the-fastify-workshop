import errors from 'http-errors'
import sql from '@nearform/sql'
import { Type, Static } from '@sinclair/typebox'
import { FastifyInstance, FastifyRequest } from 'fastify'

function userQuery(username: string) {
  return sql`SELECT * FROM users WHERE username = ${username}`
}

const bodySchema = Type.Object({
  username: Type.String(),
  password: Type.String(),
})
const responseSchema = Type.Object({ token: Type.String() })

export type LoginBody = Static<typeof bodySchema>
export type LoginResponse = Static<typeof responseSchema>

export default async function login(fastify: FastifyInstance) {
  fastify.post(
    '/login',
    {
      schema: {
        body: bodySchema,
        response: { 200: responseSchema },
      },
    },
    async (
      request: FastifyRequest<{ Body: LoginBody }>
    ): Promise<LoginResponse> => {
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
}
