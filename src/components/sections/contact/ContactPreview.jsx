import {
  CONTACT_PREVIEW_BUTTON,
  CONTACT_PREVIEW_FIELDS,
} from '../../../data/contactPreview'

export default function ContactPreview() {
  return (
    <div
      aria-label="Preview tampilan kontak"
      className="mt-8 w-full max-w-[1240px] sm:mt-10 lg:mt-[1.2vw] lg:w-[65%]"
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        {CONTACT_PREVIEW_FIELDS.map((field) => (
          <div key={field.id} className="flex flex-col gap-2">
            <span className="font-sans text-sm text-white/90 lg:text-[0.9vw]">
              {field.label}
            </span>
            <div
              className={`rounded-[4px] border border-white/10 bg-[#202020] px-4 py-3 font-sans text-sm text-white/40 lg:px-[0.8vw] lg:py-[0.55vw] lg:text-[0.9vw] ${
                field.multiline ? 'h-28 sm:h-32 lg:h-[7.1vw]' : ''
              }`}
            >
              {field.placeholder}
            </div>
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="mt-6 flex w-full items-center justify-center rounded-xl border border-white/10 py-3 font-sans text-sm text-white/60 lg:mt-[1.5vw] lg:py-[0.65vw] lg:text-[0.9vw] hover:bg-white/5 hover:text-white/80 focus:bg-white/5 focus:text-white/80 focus:outline-none"
      >
        {CONTACT_PREVIEW_BUTTON}
      </div>  
    </div>
  )
}
