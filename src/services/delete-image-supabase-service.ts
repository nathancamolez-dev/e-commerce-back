import { supabase } from '../lib/supabase'

export async function deleteImageService(fileName: string) {
  await supabase.storage.from('baremade-products-images').remove([fileName])
}
