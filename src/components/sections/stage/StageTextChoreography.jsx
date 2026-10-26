import { motion, AnimatePresence } from 'framer-motion'

// Helper kalkulasi offset acakan deterministik tiap karakter
function getScatterExit(i) {
  const angle = (i * 1.7) + 0.5
  const dist = 50 + ((i * 31) % 65)
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist - 15,
    rotate: ((i * 47) % 80) - 40,
    scale: 0.3,
    opacity: 0,
    filter: 'blur(8px)',
  }
}

function getScatterEnter(i) {
  const angle = (i * 2.1) + 1.2
  const dist = 60 + ((i * 37) % 70)
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    rotate: ((i * 53) % 90) - 45,
    scale: 0.25,
    opacity: 0,
    filter: 'blur(8px)',
  }
}

export default function StageTextChoreography({ stage }) {
  // Hanya tampil pada stage 2 (Acakan 1) dan stage 3 (Acakan 2)
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
      <AnimatePresence mode="wait">
        {/* === ACAKAN PERTAMA: "wanna know about me?" === */}
        {stage === 2 && (
          <motion.div
            key="text-acakan-1"
            className="flex flex-wrap items-center justify-center text-center max-w-[90vw]"
            initial={{ opacity: 0, y: 35 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            }}
            exit="exit"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] filter drop-shadow-[0_0_25px_rgba(255,255,255,0.25)] select-none">
              {renderWordsWithScatterExit('wanna know about me?')}
            </h2>
          </motion.div>
        )}

        {/* === ACAKAN KEDUA: "let's get to know about me" === */}
        {stage === 3 && (
          <motion.div
            key="text-acakan-2"
            className="flex flex-wrap items-center justify-center text-center max-w-[90vw]"
            exit={{
              opacity: 0,
              y: -25,
              filter: 'blur(6px)',
              transition: { duration: 0.3 },
            }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] filter drop-shadow-[0_0_25px_rgba(255,255,255,0.25)] select-none">
              {renderWordsWithScatterEnter("let's get to know about me")}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Render teks dengan animasi acakan saat exit (huruf-huruf berpencar keluar)
function renderWordsWithScatterExit(sentence) {
  const words = sentence.split(' ')
  let globalIndex = 0

  return words.map((word, wIdx) => (
    <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
      {word.split('').map((char) => {
        const i = globalIndex++
        const exitPos = getScatterExit(i)
        return (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              exit: {
                x: exitPos.x,
                y: exitPos.y,
                rotate: exitPos.rotate,
                scale: exitPos.scale,
                opacity: exitPos.opacity,
                filter: exitPos.filter,
                transition: {
                  duration: 0.45,
                  delay: i * 0.015,
                  ease: [0.32, 0, 0.67, 0],
                },
              },
            }}
          >
            {char}
          </motion.span>
        )
      })}
    </span>
  ))
}

// Render teks dengan animasi acakan saat enter (huruf-huruf terbang dari posisi acak menyatu ke tempatnya)
function renderWordsWithScatterEnter(sentence) {
  const words = sentence.split(' ')
  let globalIndex = 0

  return words.map((word, wIdx) => (
    <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
      {word.split('').map((char) => {
        const i = globalIndex++
        const enterPos = getScatterEnter(i)
        return (
          <motion.span
            key={i}
            className="inline-block"
            initial={{
              x: enterPos.x,
              y: enterPos.y,
              rotate: enterPos.rotate,
              scale: enterPos.scale,
              opacity: enterPos.opacity,
              filter: enterPos.filter,
            }}
            animate={{
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
              transition: {
                type: 'spring',
                stiffness: 95,
                damping: 14,
                delay: 0.03 + i * 0.02,
              },
            }}
          >
            {char}
          </motion.span>
        )
      })}
    </span>
  ))
}
