import fastify from 'fastify'
import { users } from './routes/users.js'

export function createServer() {
  const app = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
    },
  })

  app.log.info('Starting server')

  app.register(users)

  return app
}
