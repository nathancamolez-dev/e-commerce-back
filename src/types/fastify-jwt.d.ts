import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      sub: string
      email: string
      role: 'ADMIN' | 'USER'
    }
    user: {
      sub: string
      email: string
      role: 'ADMIN' | 'USER'
    }
  }
}
