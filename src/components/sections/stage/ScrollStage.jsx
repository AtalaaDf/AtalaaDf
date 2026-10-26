import { useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useScrollStage } from '../../../hooks/useScrollStage'
import { SCROLL_WRAPPER_HEIGHT_VH } from '../../../data/scrollStages'
import {
  CONNECTOR_SHAPES_CONFIG,
  CONNECTOR_ACAKAN_1,
  CONNECTOR_ACAKAN_2,
} from '../../../data/shapeLayouts'

import {
  STAGE_SPRING,
  connectorShapesEnter,
  aboutShapesEnter,
  aboutContentEnter,
} from '../../../animations/stageTransitions'

import HeroLeftColumn from '../hero/HeroLeftColumn'
import HomeShapes from '../hero/HomeShapes'
import AboutShapes from '../about/AboutShapes'
import AboutCard from '../about/AboutCard'
import TechnologiesList from '../about/TechnologiesList'
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

// Komponen shape tunggal dengan:
// 1. Animasi transisi layout (STAGE_SPRING)
// 2. Interaksi kursor (repulsion/menjauhkan shape dari kursor)
// 3. Animasi melayang tipis (idle floating)
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
        // Gaya dorong menjauhi kursor
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

  // Saat layout target berganti (misal scroll ke acakan 2), pulihkan offset repulsion
  // sehingga shape bertransisi murni menuju koordinat acakan kedua
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
    // Layer 1: Layout posisi panggung
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
      {/* Layer 2: Offset interaksi kursor (menjauhkan shape dari kursor) */}
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
      >
        {/* Layer 3: Animasi melayang tipis (idle floating) */}
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

export default function ScrollStage() {
  const wrapperRef = useRef(null)
  const { stage } = useScrollStage(wrapperRef)

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

  // Stage 0: Home (hero) tampil
  const showHome = stage === 0
  // Stage 1-3: ConnectorShapes tampil (deret, acakan 1, acakan 2)
  const showConnector = stage >= 1 && stage <= 3
  // Stage 4: About tampil
  const showAbout = stage === 4

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${SCROLL_WRAPPER_HEIGHT_VH}vh` }}
      className="relative"
    >
      {/* Jangkar navigasi: home berada di puncak wrapper */}
      <div id="home" className="absolute top-0 left-0 pointer-events-none" />

      {/* Jangkar navigasi: about ditempatkan pada posisi scroll stage 4 (progress 0.75) */}
      <div
        id="about"
        className="absolute left-0 pointer-events-none"
        style={{ top: `${0.75 * (SCROLL_WRAPPER_HEIGHT_VH - 100)}vh` }}
      />

      {/* Panggung sticky setinggi layar */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-base"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <AnimatePresence mode="sync">
          {/* === STAGE 0: HOME === */}
          {showHome && (
            <motion.div
              key="home-stage"
              className="absolute inset-0 flex items-center"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-25vh' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid w-full grid-cols-1 items-center gap-4 sm:gap-8 lg:grid-cols-2">
                <HeroLeftColumn />
                <HomeShapes className="hidden lg:flex" />
              </div>
            </motion.div>
          )}

          {/* === STAGE 1-3: CONNECTOR SHAPES === */}
          {showConnector && (
            <motion.div
              key="connector-stage"
              className="absolute inset-0"
              variants={connectorShapesEnter}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Glow penghubung di bagian bawah */}
              {/* <div className="pointer-events-none absolute bottom-0 left-[8%] right-[5%] h-[35%] z-0">
                {GLOW_ASSETS.connector && (
                  <img
                    src={GLOW_ASSETS.connector}
                    alt=""
                    className="w-full h-full object-cover object-bottom opacity-60 mix-blend-screen"
                    draggable={false}
                  />
                )}
              </div> */}

              {/* Area shape relatif yang memungkinkan posisi persen */}
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
            </motion.div>
          )}

          {/* === STAGE 4: ABOUT === */}
          {showAbout && (
            <motion.div
              key="about-stage"
              className="absolute inset-0 flex flex-col lg:flex-row"
              variants={aboutShapesEnter}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
            >
              {/* Shapes di kiri */}
              <AboutShapes />

              {/* Konten About */}
              <motion.div
                variants={aboutContentEnter}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full flex flex-col justify-center px-5 pt-6 pb-6 sm:px-10 lg:w-full lg:pl-[40%] lg:pr-16 lg:py-28"
              >
                <div className="flex max-w-[840px] flex-col gap-4 lg:gap-8">
                  <AboutCard />
                  <TechnologiesList />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Teks koreografi Acakan 1 & Acakan 2 */}
        <StageTextChoreography stage={stage} />
      </div>
    </div>
  )
}
