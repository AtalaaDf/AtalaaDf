import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuCircleCheck, LuCircleAlert, LuLoaderCircle } from 'react-icons/lu'
import {
  Card,
  CardContent,
  CardFooter,
} from '../../ui/Card'
import { Input } from '../../ui/Input'
import { Textarea } from '../../ui/Textarea'
import { Button } from '../../ui/Button'
import { sendContactMessage } from '../../../services/contactService'
import { contactFormSchema } from '../../../utils/contactValidation'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  // Validasi form sisi klien menggunakan Zod schema
  const validate = () => {
    const result = contactFormSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors = {}
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0]
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message
        }
      })
      setErrors(fieldErrors)
      return false
    }
    setErrors({})
    return true
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Bersihkan error saat pengguna mengetik kembali
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    setErrorMessage('')

    try {
      await sendContactMessage(formData)
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    } catch (err) {
      setStatus('error')
      setErrorMessage(err.message || 'Gagal mengirim pesan. Silakan coba lagi.')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setErrorMessage('')
    setErrors({})
  }

  return (
    <Card className="mt-8 w-full max-w-[620px]">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success-state"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center justify-center p-8 sm:p-12 text-center"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <LuCircleCheck className="text-2xl" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
              Pesan Terkirim
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/60 max-w-sm leading-relaxed mb-6">
              Terima kasih telah menghubungi saya. Pesan Anda telah diterima dan akan segera direspons.
            </p>
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              Kirim Pesan Lain
            </Button>
          </motion.div>
        ) : (
          <form
            key="form-state"
            onSubmit={handleSubmit}
            noValidate
          >
            <CardContent className="space-y-4">
              {/* Field Nama */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="block font-sans text-xs font-medium text-white/70"
                >
                  Nama
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama Anda"
                  disabled={status === 'loading'}
                  className={errors.name ? 'border-rose-500/60 focus-visible:border-rose-500' : ''}
                />
                {errors.name && (
                  <p className="font-sans text-xs text-rose-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Field Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="block font-sans text-xs font-medium text-white/70"
                >
                  Email
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  disabled={status === 'loading'}
                  className={errors.email ? 'border-rose-500/60 focus-visible:border-rose-500' : ''}
                />
                {errors.email && (
                  <p className="font-sans text-xs text-rose-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Field Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block font-sans text-xs font-medium text-white/70"
                >
                  Pesan
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tuliskan pesan atau ide diskusi Anda..."
                  disabled={status === 'loading'}
                  className={errors.message ? 'border-rose-500/60 focus-visible:border-rose-500' : ''}
                />
                {errors.message && (
                  <p className="font-sans text-xs text-rose-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Banner Error Pengiriman */}
              {status === 'error' && (
                <div className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-rose-300">
                  <LuCircleAlert className="text-base flex-shrink-0" />
                  <span className="font-sans text-xs">
                    {errorMessage}
                  </span>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={status === 'loading'}
                variant="default"
                size="default"
              >
                {status === 'loading' ? (
                  <>
                    <LuLoaderCircle className="animate-spin text-sm" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <span>Kirim Pesan</span>
                )}
              </Button>
            </CardFooter>
          </form>
        )}
      </AnimatePresence>
    </Card>
  )
}
