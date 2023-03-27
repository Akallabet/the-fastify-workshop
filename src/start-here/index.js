import fastify from 'fastify'
import { users } from './routes/users.js'
import { login } from './routes/login.js'

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
  app.register(login)

  return app
}
