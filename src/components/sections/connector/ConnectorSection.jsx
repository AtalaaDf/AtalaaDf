import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useScrollStage } from '../../../hooks/useScrollStage'
import {
  CONNECTOR_STAGE_THRESHOLDS,
  CONNECTOR_WRAPPER_HEIGHT_VH,
} from '../../../data/scrollStages'
import {
  CONNECTOR_SHAPES_CONFIG,
  CONNECTOR_ACAKAN_1,
  CONNECTOR_ACAKAN_2,
} from '../../../data/shapeLayouts'
import { STAGE_SPRING } from '../../../animations/stageTransitions'
import StageTextChoreography from './StageTextChoreography'

// Konfigurasi animasi melayang tipis (floating idle) unik tiap shape
const FLOAT_CONFIGS = {
  plus: { y: [-6, 6, -6], rotate: [-2.5, 2.5, -2.5], duration: 4.0, delay: 0 },
  square: { y: [5, -5, 5], rotate: [2, -2, 2], duration: 4.6, delay: 0.4 },
  star: { y: [-5, 5, -5], rotate: [-3, 3, -3], duration: 4.2, delay: 0.8 },
  circle: { y: [6, -6, 6], rotate: [1.5, -1.5, 1.5], duration: 3.6, delay: 0.2 },
  triangle: { y: [-4, 6, -4], rotate: [-2, 2, -2], duration: 4.8, delay: 0.6 },
}

// Posisi shape pada layout connector awal (deret horizontal tengah)
function getConnectorLayout(shape) {
  const found = CONNECTOR_SHAPES_CONFIG.find((s) => s.id === shape.id)
  return {
    left: `${found?.centerX ?? 50}%`,
    top: '50%',
    width: `${found?.widthVw ?? 8}vw`,
    rotation: 0,
    opacity: 1,
  }
}

// Posisi shape pada layout acakan tertentu
function getAcakanLayout(shape, acakanData) {
  const found = acakanData.find((s) => s.id === shape.id)
  return {
    left: `${found?.centerX ?? 50}%`,
    top: `${found?.centerY ?? 50}%`,
    width: `${found?.widthVw ?? 8}vw`,
    rotation: found?.rotation ?? 0,
    opacity: 1,
  }
}

// Komponen shape tunggal dengan efek interaksi kursor & animasi panggung
function StageConnectorShape({ shape, layout, mouseX, mouseY }) {
  const shapeRef = useRef(null)
  const repelX = useMotionValue(0)
  const repelY = useMotionValue(0)
  const springX = useSpring(repelX, { stiffness: 140, damping: 16, mass: 0.7 })
  const springY = useSpring(repelY, { stiffness: 140, damping: 16, mass: 0.7 })

  // Kalkulasi jarak kursor ke shape untuk efek repulsion (menjauhkan)
  useEffect(() => {
    const handleUpdate = () => {
      if (!shapeRef.current) return
      const rect = shapeRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mx = mouseX.get()
      const my = mouseY.get()

      const dx = centerX - mx
      const dy = centerY - my
      const dist = Math.hypot(dx, dy)
      const REPEL_RADIUS = 230

      if (dist < REPEL_RADIUS && dist > 0) {
        const force = Math.pow(1 - dist / REPEL_RADIUS, 1.3)
        const maxPush = 95
        repelX.set((dx / dist) * force * maxPush)
        repelY.set((dy / dist) * force * maxPush)
      } else {
        repelX.set(0)
        repelY.set(0)
      }
    }

    const unsubX = mouseX.on('change', handleUpdate)
    const unsubY = mouseY.on('change', handleUpdate)

    return () => {
      unsubX()
      unsubY()
    }
  }, [mouseX, mouseY])

  useEffect(() => {
    repelX.set(0)
    repelY.set(0)
  }, [layout.left, layout.top])

  const floatCfg = FLOAT_CONFIGS[shape.id] || {
    y: [-5, 5, -5],
    rotate: [-2, 2, -2],
    duration: 4,
    delay: 0,
  }

  return (
    <motion.div
      ref={shapeRef}
      className="absolute flex items-center justify-center pointer-events-none select-none"
      initial={false}
      animate={{
        left: layout.left,
        top: layout.top,
        width: layout.width,
        rotate: layout.rotation,
        opacity: layout.opacity,
      }}
      transition={STAGE_SPRING}
      style={{
        x: '-50%',
        y: '-50%',
        minWidth: '60px',
      }}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
      >
        <motion.div
          animate={{
            y: floatCfg.y,
            rotate: floatCfg.rotate,
          }}
          transition={{
            duration: floatCfg.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: floatCfg.delay,
          }}
          className="relative flex items-center justify-center"
        >
          <img
            src={shape.asset}
            alt={shape.name}
            className="w-full h-auto object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.65)] filter drop-shadow-[0_0_35px_rgba(180,220,230,0.35)]"
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function ConnectorSection() {
  const wrapperRef = useRef(null)
  const { stage } = useScrollStage(wrapperRef, CONNECTOR_STAGE_THRESHOLDS)

  // Tracking posisi kursor pada panggung menggunakan MotionValue (tanpa re-render)
  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handlePointerLeave = () => {
    mouseX.set(-9999)
    mouseY.set(-9999)
  }

  // Tentukan layout tiap shape berdasarkan stage aktif
  function getShapeLayout(shape) {
    if (stage === 1) return getConnectorLayout(shape)
    if (stage === 2) return getAcakanLayout(shape, CONNECTOR_ACAKAN_1)
    if (stage === 3) return getAcakanLayout(shape, CONNECTOR_ACAKAN_2)
    return getConnectorLayout(shape)
  }

  return (
    <section
      id="connector"
      ref={wrapperRef}
      style={{ height: `${CONNECTOR_WRAPPER_HEIGHT_VH}vh` }}
      className="relative w-full bg-base"
      aria-label="Section Koreografi Penghubung"
    >
      {/* Panggung sticky setinggi layar untuk koreografi shapes & teks */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-base flex items-center justify-center"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* Render 5 shapes koreografi */}
        <div className="relative w-full h-full z-10">
          {CONNECTOR_SHAPES_CONFIG.map((shape) => (
            <StageConnectorShape
              key={shape.id}
              shape={shape}
              layout={getShapeLayout(shape)}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          ))}
        </div>

        {/* Teks koreografi Acakan 1 & Acakan 2 */}
        <StageTextChoreography stage={stage} />
      </div>
    </section>
  )
}
