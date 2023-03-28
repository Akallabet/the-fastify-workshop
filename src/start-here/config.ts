import { join } from 'path'
import { Type, Static } from '@sinclair/typebox'
import envSchema from 'env-schema'

const schema = Type.Strict(
  Type.Object({
    JWT_SECRET: Type.String(),
    LOG_LEVEL: Type.Optional(Type.String()),
    PRETTY_PRINT: Type.Optional(Type.Boolean()),
    PG_CONNECTION_STRING: Type.String(),
  })
)

export const config = envSchema<EnvConfig>({
  schema,
  dotenv: { path: join(__dirname, '.env') },
})

export type EnvConfig = Static<typeof schema>
