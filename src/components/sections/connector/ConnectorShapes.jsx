import { CONNECTOR_SHAPES_CONFIG } from '../../../data/shapeLayouts'

export default function ConnectorShapes() {
  return (
    <div className="relative w-full flex items-center justify-center py-12 overflow-hidden">
      <div className="relative w-full max-w-[1200px] mx-auto flex items-center justify-between px-[8%]">
        {CONNECTOR_SHAPES_CONFIG.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-center"
            style={{ width: `${item.widthVw}vw`, minWidth: '80px' }}
          >
            <img
              src={item.asset}
              alt={item.name}
              className="w-full h-auto object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.65)]"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
