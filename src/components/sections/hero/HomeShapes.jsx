import { motion, useReducedMotion } from 'framer-motion'
import { HOME_SHAPES_CONFIG } from '../../../data/shapeLayouts'
import { GLOW_ASSETS } from '../../../data/assets'
import { glowPulseVariants } from '../../../animations/shapeMotion'
import { useAutoRotate } from '../../../hooks/useAutoRotate'
import OrbitingShapeItem from './OrbitingShapeItem'

export default function HomeShapes({ className = '' }) {
  const prefersReducedMotion = useReducedMotion()
  const { rotationAngle, dragProps } = useAutoRotate({ baseSpeed: 0.003 })

  return (
    <div
      {...dragProps}
      className={`relative flex h-[88vw] min-h-[300px] w-full select-none items-center justify-center touch-pan-y sm:h-[55vw] sm:min-h-[360px] lg:h-[38vw] lg:min-h-[420px] lg:touch-none cursor-grab active:cursor-grabbing ${className}`}
      aria-label="Animasi interaktif 5 elemen berputar"
      role="region"
    >
      {/* glow di latar belakang tengah */}
      <motion.div
        variants={glowPulseVariants}
        initial="initial"
        animate={prefersReducedMotion ? 'initial' : 'animate'}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Lapisan 1: Pendaran cahaya lembut lebar */}
        <div className="h-[72vw] w-[72vw] min-h-[280px] min-w-[280px] rounded-full bg-[radial-gradient(circle_at_center,rgba(200,230,240,0.5)_0%,rgba(140,180,195,0.35)_35%,rgba(90,130,140,0.15)_60%,transparent_75%)] blur-2xl lg:h-[30vw] lg:w-[30vw] lg:min-h-[340px] lg:min-w-[340px]" />

        {/* Lapisan 2: Gambar aset glow di elemen */}
        {GLOW_ASSETS.elements && (
          <img
            src={GLOW_ASSETS.elements}
            alt=""
            className="absolute inset-0 w-full h-full object-contain mix-blend-screen opacity-90 scale-125"
            draggable={false}
          />
        )}

        {/* Lapisan 3: Inti cahaya putih terang di tengah orbit */}
        <div className="absolute top-1/2 left-1/2 h-[30vw] w-[30vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,rgba(210,240,250,0.3)_45%,transparent_70%)] blur-lg lg:h-[12vw] lg:w-[12vw]" />
      </motion.div>

      {/* 5 Elemen shape berputar di orbit 3D */}
      <div className="relative w-full h-full flex items-center justify-center z-10">
        {HOME_SHAPES_CONFIG.map((shape) => (
          <OrbitingShapeItem
            key={shape.id}
            shape={shape}
            angle={rotationAngle + shape.angleOffset}
          />
        ))}
      </div>
    </div>
  )
}
