export default function TrackLine({ className = '', style = {} }) {
  return (
    <div
      className={`w-[24px] sm:w-[1.4vw] rounded-full border-[4px] sm:border-[6px] border-black bg-track-fill ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}
