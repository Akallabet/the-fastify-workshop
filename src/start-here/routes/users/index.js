import S from 'fluent-json-schema'
import sql from '@nearform/sql'

function usersQuery() {
  return sql`SELECT * FROM users`
}

export default async function users(fastify, opts, next) {
  fastify.route({
    method: 'GET',
    url: '/',
    onRequest: fastify.authenticate,
    schema: {
      response: {
        200: S.object().prop(
          'users',
          S.array().items(
            S.object()
              .prop('username', S.string().required())
              .prop('id', S.integer().required())
          )
        ),
      },
    },
    handler: async request => {
      request.log.info('Fetching users')
      const { rows } = await fastify.pg.query(usersQuery())
      request.log.info('Users fetched')
      return { users: rows }
    },
  })

  next()
}
