import t from 'tap'
import { createServer } from '../index.js'

t.test('GET /users', async t => {
  const app = await createServer()
  const response = await app.inject({
    method: 'GET',
    url: '/users',
  })
  t.equal(response.statusCode, 200)
  t.same(response.json(), {
    users: [{ username: 'john' }, { username: 'jane' }],
  })
})
