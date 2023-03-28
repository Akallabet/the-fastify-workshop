import { join } from 'desm'
import envSchema from 'env-schema'
import { S } from 'fluent-json-schema'

export const config = envSchema({
  schema: S.object().prop('JWT_SECRET', S.string().required()),
  dotenv: { path: join(import.meta.url, '.env') },
})
