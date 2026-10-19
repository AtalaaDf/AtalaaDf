import { motion } from 'framer-motion'

export default function OrbitingShapeItem({
  shape,
  angle,
  radiusX = 14,
  radiusY = 7.5,
  tiltDeg = -16,
}) {
  const tiltRad = (tiltDeg * Math.PI) / 180
  const u = radiusX * Math.cos(angle)
  const v = radiusY * Math.sin(angle)

{/* Koordinat elips yang dirotasi menurut sudut kemiringan perspektif 3D */}
  const x = u * Math.cos(tiltRad) - v * Math.sin(tiltRad)
  const y = u * Math.sin(tiltRad) + v * Math.cos(tiltRad)

  {/* Kedalaman 3D (-1 di belakang, +1 di depan)*/}
  const depth = Math.sin(angle)
  const normalizedDepth = (depth + 1) / 2

  const scale = 0.75 + 0.35 * normalizedDepth
  const opacity = 0.6 + 0.4 * normalizedDepth
  const zIndex = Math.round(normalizedDepth * 20) + 2

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
      style={{
        x: `${x}vw`,
        y: `${y}vw`,
        scale,
        opacity,
        zIndex,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
    >
      <div className="relative flex items-center justify-center">
        <div
          className="absolute inset-0 -m-6 rounded-full bg-white/20 blur-xl pointer-events-none"
          style={{ opacity: normalizedDepth }}
          aria-hidden="true"
        />
        <img
          src={shape.asset}
          alt={shape.name}
          className="h-auto w-[18vw] min-w-[72px] max-w-[260px] object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.85)] filter drop-shadow-[0_0_45px_rgba(180,220,230,0.55)] sm:w-[14vw] sm:min-w-[100px] lg:w-[10vw] lg:min-w-[120px]"
          draggable={false}
        />
      </div>
    </motion.div>
  )
}
