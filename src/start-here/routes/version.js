export default async function version(fastify, opts, next) {
  fastify.route({
    method: 'GET',
    url: '/version',
    constraints: { version: '1.0.0' },
    handler: async () => {
      return { version: '1.0.0' }
    },
  })

  next()
}
