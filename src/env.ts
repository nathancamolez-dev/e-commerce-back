import { z } from 'zod'

const schemaEnv = z.object({
  JWT_SECRET_KEY: z.string(),
  DATABASE_URL: z.string().url(),
  SUPABASE_URL: z.string().url(),
  SUPABASE_API_KEY: z.string(),
  SUPABASE_SERVICE_ROLE: z.string(),
})

export const env = schemaEnv.parse(process.env)
