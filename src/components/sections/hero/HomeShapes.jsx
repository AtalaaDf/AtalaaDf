import { motion } from 'framer-motion'
import { HOME_SHAPES_CONFIG } from '../../../data/shapeLayouts'
import { GLOW_ASSETS } from '../../../data/assets'
import { glowPulseVariants } from '../../../animations/shapeMotion'
import { useAutoRotate } from '../../../hooks/useAutoRotate'
import OrbitingShapeItem from './OrbitingShapeItem'

export default function HomeShapes({ className = '' }) {
  const { rotationAngle, dragProps } = useAutoRotate({ baseSpeed: 0.003 })

  return (
    <div
      {...dragProps}
      className={`relative flex items-center justify-center w-full h-[38vw] min-h-[420px] select-none cursor-grab active:cursor-grabbing touch-none ${className}`}
      aria-label="Animasi interaktif 5 elemen berputar"
      role="region"
    >
      {/* glow di latar belakang tengah */}
      <motion.div
        variants={glowPulseVariants}
        initial="initial"
        animate="animate"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Lapisan 1: Pendaran cahaya lembut lebar */}
        <div className="w-[30vw] h-[30vw] min-w-[340px] min-h-[340px] rounded-full bg-[radial-gradient(circle_at_center,rgba(200,230,240,0.5)_0%,rgba(140,180,195,0.35)_35%,rgba(90,130,140,0.15)_60%,transparent_75%)] blur-2xl" />

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12vw] h-[12vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,rgba(210,240,250,0.3)_45%,transparent_70%)] blur-lg" />
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
