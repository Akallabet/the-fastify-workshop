import fastify from 'fastify'
import { users } from './routes/users.js'

export function createServer() {
  const app = fastify()

  app.get('/', async () => {
    return { hello: 'world' }
  })

  app.register(users)

  return app
}
