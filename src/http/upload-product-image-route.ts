import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { prisma } from '../lib/prisma'
import { updateImageService } from '../services/update-image-service'
import { uploadImage } from '../services/upload-image'

export const uploadProductImageRoute: FastifyPluginAsyncZod = async app => {
  app.patch(
    '/product/:id/image',
    { preHandler: app.authenticate },
    async (req, reply) => {
      const { id } = req.params as { id: string }

      const imageFile = await req.file()

      if (!imageFile) {
        return reply.status(400).send({ error: 'No file uploaded' })
      }

      console.log('Imagem recebida:', imageFile.filename)

      if (!imageFile) {
        return reply.status(400).send({ error: 'Image file is required' })
      }

      const buffer = await imageFile.toBuffer()
      console.log('Image:', imageFile)
      const imageUrl = await uploadImage(
        buffer,
        imageFile.filename,
        imageFile.mimetype
      )

      if (!imageUrl) {
        return reply.status(500).send({ error: 'Upload failed' })
      }
      await updateImageService({ id, imageUrl })

      return reply.status(200).send({ message: 'Image uploaded', imageUrl })
    }
  )
}
