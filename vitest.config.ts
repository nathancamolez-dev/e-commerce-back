import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    test: {
      fileParallelism: false,
      globals: true,
      environment: 'node',
      setupFiles: './test/setup.ts',
      env,
    },
  }
})
