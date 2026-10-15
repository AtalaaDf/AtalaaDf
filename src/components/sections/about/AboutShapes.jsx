import { ABOUT_SHAPES_CONFIG } from '../../../data/shapeLayouts'
import { GLOW_ASSETS } from '../../../data/assets'

export default function AboutShapes() {
  return (
    <>
      {/* Glow radial di belakang 3 shape */}
      <div
        className="absolute pointer-events-none z-0"
        style={{ left: '15%', top: '45%', transform: 'translate(-50%, -50%)', width: '28vw', height: '28vw', minWidth: '260px', minHeight: '260px' }}
        aria-hidden="true"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,rgba(150,185,195,0.38)_0%,rgba(90,130,140,0.12)_45%,transparent_70%)] blur-2xl" />
        {GLOW_ASSETS.elements && (
          <img
            src={GLOW_ASSETS.elements}
            alt=""
            className="absolute inset-0 w-full h-full object-contain mix-blend-screen opacity-75"
            draggable={false}
          />
        )}
      </div>

      {/* 3 Bentuk: Bintang, Lingkaran, Segitiga */}
      {ABOUT_SHAPES_CONFIG.map((item) => (
        <div
          key={item.id}
          className="absolute flex items-center justify-center pointer-events-none select-none z-10"
          style={{
            left: `${item.centerX}%`,
            top: `${item.centerY}%`,
            width: `${item.widthVw}vw`,
            minWidth: '70px',
            transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
          }}
        >
          <img
            src={item.asset}
            alt={item.name}
            className="w-full h-auto object-contain drop-shadow-[0_0_22px_rgba(255,255,255,0.8)]"
            draggable={false}
          />
        </div>
      ))}
    </>
  )
}
