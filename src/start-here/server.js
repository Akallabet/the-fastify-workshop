import { createServer } from './index.js'
import { config } from './config.js'

const start = async () => {
  const app = createServer(config)
  try {
    app.listen({ port: 3000 })
  } catch (err) {
    app.log(err)
    process.exit(1)
  }
}
start()
