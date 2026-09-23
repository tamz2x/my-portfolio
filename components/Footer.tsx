import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="py-5 mt-5 border-top border-secondary border-opacity-25">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h5 className="fw-bold text-white mb-3">MACS Studio</h5>
            <p className="text-secondary small mb-0">
              Crafting digital experiences that feel as good as they look.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex gap-4 justify-content-md-end">
              <a href="mailto:macs.webprojects@gmail.com" className="text-secondary text-decoration-none hover-text-white small">
                Email
              </a>
              <a href="https://www.facebook.com/macscybernatics" target="_blank" rel="noopener noreferrer" className="text-secondary text-decoration-none hover-text-white small">
                Facebook
              </a>
              <a href="https://github.com/macswebprojects-cybernatics" target="_blank" rel="noopener noreferrer" className="text-secondary text-decoration-none hover-text-white small">
                GitHub
              </a>
            </div>
            <p className="text-secondary small mt-4 mb-0 opacity-50">
              &copy; {currentYear} MACS Studio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}