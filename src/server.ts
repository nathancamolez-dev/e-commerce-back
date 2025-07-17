import { fastifyCors } from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { type FastifyReply, type FastifyRequest, fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { createProductRoute } from './http/create-product-route'
import { deleteProductByIdRoute } from './http/delete-product-route-by-id-route'
import { findProductBySlugRoute } from './http/find-product-by-slug-route'
import { highlightProductRoute } from './http/highlight-product-route'
import { pauseProductRoute } from './http/pause-product-route'
import { showAllProductsRoute } from './http/show-all-products-route'
import { showFeaturedProductsRoute } from './http/show-featured-products-route'
import { uploadProductImageRoute } from './http/upload-product-image-route'

export const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: env.APP_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY,
})

app.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
      if (request.user.role !== 'ADMIN') {
        return reply.status(401).send({ error: 'Forbidden: Not admin' })
      }
    } catch (err) {
      console.log(err)
      reply.status(401).send({ error: 'Unauthorized' })
    }
  }
)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Backend for BareMade e-commerce',
      version: '1.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyMultipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
})

app.register(createProductRoute)
app.register(findProductBySlugRoute)
app.register(showFeaturedProductsRoute)
app.register(showAllProductsRoute)
app.register(pauseProductRoute)
app.register(highlightProductRoute)
app.register(deleteProductByIdRoute)
app.register(uploadProductImageRoute)

app
  .listen({ port: 3333 })
  .then(() => console.log('Server running on the port 3333'))
