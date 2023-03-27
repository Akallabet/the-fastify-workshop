import { createServer } from './index.js'

const start = async () => {
  const app = createServer()
  try {
    app.listen({ port: 3000 })
  } catch (err) {
    app.log(err)
    process.exit(1)
  }
}
start()
