import fastify from 'fastify'
import { users } from './routes/users.js'

export function createServer() {
  const app = fastify()

  app.register(users)

  return app
}
