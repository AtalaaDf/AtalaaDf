import { z } from 'zod'

// Skema validasi formulir kontak menggunakan Zod
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nama wajib diisi.')
    .min(2, 'Nama terlalu pendek (minimal 2 karakter).'),
  email: z
    .string()
    .trim()
    .min(1, 'Email wajib diisi.')
    .email('Format email tidak valid.'),
  message: z
    .string()
    .trim()
    .min(1, 'Pesan wajib diisi.')
    .min(5, 'Pesan terlalu pendek (minimal 5 karakter).'),
})
