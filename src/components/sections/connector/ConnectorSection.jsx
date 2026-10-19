import ConnectorShapes from './ConnectorShapes'

export default function ConnectorSection() {
  return (
    <section
      id="connector"
      className="relative hidden w-full overflow-hidden bg-base lg:block"
      aria-label="Section Penghubung"
    >
      <ConnectorShapes />
    </section>
  )
}
