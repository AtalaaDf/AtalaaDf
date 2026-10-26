import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuCircleCheck, LuCircleAlert, LuLoaderCircle } from 'react-icons/lu'
import PillButton from '../../ui/PillButton'
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
    <div className="mt-8 w-full max-w-full rounded-3xl lg:rounded-[36px] border border-white/10 bg-[#222222]/90 backdrop-blur-md p-6 sm:p-10 lg:w-[48%] shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              <LuCircleCheck className="text-2xl" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Pesan Terkirim
            </h3>
            <p className="font-sans text-sm text-white/60 max-w-sm leading-relaxed mb-8">
              Terima kasih telah menghubungi saya. Pesan Anda telah diterima dan akan segera direspons.
            </p>
            <PillButton
              onClick={handleReset}
              className="px-7 py-2.5 text-sm"
              ariaLabel="Kirim pesan lain"
            >
              Kirim Pesan Lain
            </PillButton>
          </motion.div>
        ) : (
          <form
            key="form-state"
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* Field Nama */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                className="font-sans text-xs sm:text-sm font-medium text-white/70 tracking-wide"
              >
                Nama
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Anda"
                disabled={status === 'loading'}
                className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 font-sans text-sm sm:text-base text-white placeholder:text-white/25 transition-all duration-200 focus:bg-white/[0.06] focus:outline-none focus:ring-0 ${
                  errors.name
                    ? 'border-rose-500/70 focus:border-rose-500'
                    : 'border-white/10 focus:border-white/30'
                }`}
              />
              {errors.name && (
                <span className="font-sans text-xs text-rose-400 mt-0.5">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Field Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-email"
                className="font-sans text-xs sm:text-sm font-medium text-white/70 tracking-wide"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                disabled={status === 'loading'}
                className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 font-sans text-sm sm:text-base text-white placeholder:text-white/25 transition-all duration-200 focus:bg-white/[0.06] focus:outline-none focus:ring-0 ${
                  errors.email
                    ? 'border-rose-500/70 focus:border-rose-500'
                    : 'border-white/10 focus:border-white/30'
                }`}
              />
              {errors.email && (
                <span className="font-sans text-xs text-rose-400 mt-0.5">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Field Message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-message"
                className="font-sans text-xs sm:text-sm font-medium text-white/70 tracking-wide"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tuliskan pesan atau ide diskusi Anda di sini..."
                disabled={status === 'loading'}
                className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 font-sans text-sm sm:text-base text-white placeholder:text-white/25 transition-all duration-200 focus:bg-white/[0.06] focus:outline-none focus:ring-0 min-h-[140px] resize-y ${
                  errors.message
                    ? 'border-rose-500/70 focus:border-rose-500'
                    : 'border-white/10 focus:border-white/30'
                }`}
              />
              {errors.message && (
                <span className="font-sans text-xs text-rose-400 mt-0.5">
                  {errors.message}
                </span>
              )}
            </div>

            {/* Banner Error Pengiriman */}
            {status === 'error' && (
              <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-3 text-rose-300">
                <LuCircleAlert className="text-base flex-shrink-0" />
                <span className="font-sans text-xs sm:text-sm">
                  {errorMessage}
                </span>
              </div>
            )}

            {/* Tombol Kirim di Bawah Kanan */}
            <div className="flex justify-end pt-2">
              <PillButton
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-3 text-sm font-medium flex items-center gap-2 tracking-wide"
                ariaLabel="Kirim formulir pesan"
              >
                {status === 'loading' ? (
                  <>
                    <LuLoaderCircle className="animate-spin text-base" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <span>Kirim</span>
                )}
              </PillButton>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  )
}
