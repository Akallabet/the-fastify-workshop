import { createServer } from './index'
import { config } from './config'

const start = async (): Promise<void> => {
  const app = createServer(config)
  try {
    app.listen({ port: 3000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
