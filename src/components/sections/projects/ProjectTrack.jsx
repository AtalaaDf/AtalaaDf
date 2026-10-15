import { motion } from 'framer-motion'
import QuarterBadge from '../../ui/QuarterBadge'

export default function ProjectTrack({
  trackRef,
  dragProps,
  activeQuarter,
  quartersData,
}) {
  const currentQuarterData = quartersData[activeQuarter] || quartersData[0]

  // Posisi persentase vertikal untuk badge dan thumb per quarter (0 to 3)
  const thumbPositions = ['0%', '30%', '60%', '90%']

  return (
    <div className="relative flex items-start gap-4 sm:gap-6 select-none">
      {/* Batang track vertikal dengan tombol di dalamnya */}
      <div
        ref={trackRef}
        {...dragProps}
        className="relative h-[480px] sm:h-[560px] w-7 sm:w-[1.4vw] min-w-[26px] rounded-full border-[5px] sm:border-[6px] border-black bg-[#1c1c1c] p-0.5 cursor-pointer touch-none shadow-xl"
        aria-label="Track vertikal navigasi Quarter Projects"
      >
        {/* Tombol handle putih di dalam garis yang bergeser ke bawah */}
        <motion.div
          className="w-full h-14 sm:h-16 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] cursor-grab active:cursor-grabbing"
          animate={{
            top: thumbPositions[activeQuarter] || '0%',
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          style={{ position: 'absolute', left: 0 }}
        />
      </div>

      {/* Badge tahun dan quarter yang ikut bergerak ke bawah */}
      <motion.div
        className="absolute left-10 sm:left-14"
        animate={{
          top: thumbPositions[activeQuarter] || '0%',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        <QuarterBadge
          year={currentQuarterData.year}
          quarter={currentQuarterData.quarter}
        />
      </motion.div>
    </div>
  )
}
