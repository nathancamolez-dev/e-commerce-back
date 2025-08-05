import { expect, test } from 'vitest'

test('env variable test', () => {
  console.log(process.env.DATABASE_URL_TEST)
  expect(process.env.NODE_ENV).toBe('test')
})
