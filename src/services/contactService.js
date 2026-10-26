import { contactFormSchema } from '../utils/contactValidation'

// Service simulasi pengiriman pesan formulir kontak
// Menggunakan skema Zod untuk validasi data
export async function sendContactMessage(formData) {
  // Validasi data masukan dengan skema Zod
  const validatedData = contactFormSchema.parse(formData)

  // Simulasi jeda pengiriman jaringan
  await new Promise((resolve) => setTimeout(resolve, 850))

  return {
    success: true,
    data: validatedData,
    message: 'Terima kasih, pesan Anda telah berhasil dikirim.',
  }
}
