export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 border-top border-secondary border-opacity-25">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="text-secondary small mb-0">
            <span className="fw-bold text-white">MACS Studio</span> · Crafting digital experiences
          </p>
          <p className="text-secondary small mb-0 opacity-75">
            &copy; {currentYear} MACS Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}