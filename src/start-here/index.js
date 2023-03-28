import fastify from 'fastify'
import { users } from './routes/users.js'
import { login } from './routes/login.js'
import { version } from './routes/version.js'
import { authentication } from './plugins/authentication.js'

export function createServer(config) {
  const app = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
    },
  })

  app.log.info('Starting server')

  app.register(authentication, config)
  app.register(users)
  app.register(login)
  app.register(version)

  return app
}
