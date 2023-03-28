import fastify from 'fastify'
import autoload from '@fastify/autoload'
import { join } from 'desm'

export function createServer(config) {
  const app = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
    },
  })

  app.log.info('Starting server')
  app.register(import('@fastify/autoload'), {
    dir: join(import.meta.url, 'routes'),
  })
  app.register(autoload, {
    dir: join(import.meta.url, 'plugins'),
    options: config,
  })

  return app
}
