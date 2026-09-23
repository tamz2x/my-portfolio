export default function Footer() {
  return (
    <footer id="contact" className="py-5 mt-5" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-3 text-muted-custom small">
        <p className="mb-0">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <div className="d-flex gap-4">
          <a href="mailto:you@email.com" className="text-muted-custom text-decoration-none">Email</a>
          <a href="#" className="text-muted-custom text-decoration-none">Twitter</a>
          <a href="#" className="text-muted-custom text-decoration-none">GitHub</a>
        </div>
      </div>
    </footer>
  )
}