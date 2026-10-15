export default function QuarterBadge({
  year = '2026',
  quarter = 'Quarter 1',
  className = '',
}) {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center rounded-xl border border-white/20 bg-[#181818] px-4 py-2.5 shadow-2xl ${className}`}
    >
      <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-white">
        {year}
      </span>
      <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-white whitespace-nowrap">
        {quarter}
      </span>
    </div>
  )
}
