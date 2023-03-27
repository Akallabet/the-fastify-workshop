import fastify from 'fastify'
import { users } from './routes/users.js'
import { login } from './routes/login.js'
import { version } from './routes/version.js'

export function createServer() {
  const app = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
    },
  })

  app.log.info('Starting server')

  //Register fastify jwt plugin
  app.register(import('@fastify/jwt'), { secret: 'supersecret' })

  app.register(users)
  app.register(login)
  app.register(version)

  return app
}
