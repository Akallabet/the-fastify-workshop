import { FastifyInstance } from 'fastify'

export default async function version(
  fastify: FastifyInstance
): Promise<void> {
  fastify.route({
    method: 'GET',
    url: '/version',
    constraints: { version: '1.0.0' },
    handler: async () => {
      return { version: '1.0.0' }
    },
  })
}
