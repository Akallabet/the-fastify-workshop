import { join } from 'path'
import { Type, Static } from '@sinclair/typebox'
import envSchema from 'env-schema'

const schema = Type.Strict(
  Type.Object({
    JWT_SECRET: Type.String(),
    LOG_LEVEL: Type.Optional(Type.String()),
    PRETTY_PRINT: Type.Optional(Type.Boolean()),
  })
)
// S.object()
//   .prop('JWT_SECRET', S.string().required())
//   .prop('LOG_LEVEL', S.string().default('info'))
//   .prop('PRETTY_PRINT', S.string().default(true))
//   .valueOf()

export default envSchema<EnvConfig>({
  schema,
  dotenv: { path: join(__dirname, '.env') },
})

export type EnvConfig = {
  JWT_SECRET: string
  PRETTY_PRINT: boolean
  LOG_LEVEL: string
}
