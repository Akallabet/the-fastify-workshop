import fastify, { FastifyInstance } from 'fastify'
import autoload from '@fastify/autoload'
import postgres from '@fastify/postgres'
import { join } from 'path'
import { EnvConfig } from './config'

export function createServer(config: EnvConfig): FastifyInstance {
  const app = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
    },
  })

  app.log.info('Starting server')
  app.register(postgres, {
    connectionString: config.PG_CONNECTION_STRING,
  })
  app.register(import('@fastify/autoload'), {
    dir: join(__dirname, 'routes'),
  })
  app.register(autoload, {
    dir: join(__dirname, 'plugins'),
    options: config,
  })

  return app
}
