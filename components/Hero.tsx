export default function Hero() {
  return (
    <section className="d-flex align-items-center" style={{ minHeight: '100vh', paddingTop: 80 }}>
      <div className="container">
        <p className="text-uppercase text-muted-custom mb-3" style={{ letterSpacing: '0.2em', fontSize: '.85rem' }}>
          Designer & Developer
        </p>
        <h1 className="display-2 fw-bold lh-1 mb-4">
          Crafting digital <br />
          <span style={{
            background: 'linear-gradient(90deg,#fff,#666)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>experiences.</span>
        </h1>
        <p className="text-muted-custom fs-5" style={{ maxWidth: 520 }}>
          I build modern, minimal interfaces that feel as good as they look.
        </p>
      </div>
    </section>
  )
}