import { z } from 'zod'

const schemaEnv = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  APP_URL: z.string().url(),
  JWT_SECRET_KEY: z.string(),
  DATABASE_URL: z.string().url(),
  SUPABASE_URL: z.string().url(),
  SUPABASE_API_KEY: z.string(),
  SUPABASE_SERVICE_ROLE: z.string(),
  DATABASE_URL_TEST: z.string().url(),
})

export const env = schemaEnv.parse(process.env)
