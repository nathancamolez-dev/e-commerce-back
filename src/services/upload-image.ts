import { supabase } from '../lib/supabase'

export async function uploadImage(
  buffer: Buffer,
  fileName: string,
  mimeType: string
) {
  const { data, error } = await supabase.storage
    .from('baremade-products-images')
    .upload(fileName, buffer, {
      contentType: mimeType,
    })

  if (error) {
    console.error('error on uploading to the supabase', error)
    return null
  }

  const { data: publicURL } = supabase.storage
    .from('baremade-products-images')
    .getPublicUrl(fileName)

  return publicURL.publicUrl
}
