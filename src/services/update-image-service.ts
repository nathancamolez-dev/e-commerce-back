import { prisma } from '../lib/prisma'

interface UpdateImageProps {
  id: string
  imageUrl: string
}

export async function updateImageService({ id, imageUrl }: UpdateImageProps) {
  try {
    await prisma.product.update({
      where: { id },
      data: { image_url: imageUrl },
    })
  } catch (err) {
    throw new Error('Error')
  }
}
