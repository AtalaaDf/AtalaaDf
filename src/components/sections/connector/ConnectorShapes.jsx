import { CONNECTOR_SHAPES_CONFIG } from '../../../data/shapeLayouts'

export default function ConnectorShapes() {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden py-8 sm:py-12">
      <div className="relative w-full max-w-[1200px] mx-auto flex items-center justify-between px-[8%]">
        {CONNECTOR_SHAPES_CONFIG.map((item) => (
          <div
            key={item.id}
            className="flex min-w-[40px] items-center justify-center sm:min-w-[56px] lg:min-w-[80px]"
            style={{ width: `${item.widthVw}vw` }}
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
