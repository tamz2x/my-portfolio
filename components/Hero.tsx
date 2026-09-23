"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-vh-100 d-flex align-items-center position-relative overflow-hidden" style={{ paddingTop: '80px' }}>
      {/* Background Glow Effect */}
      <div 
        className="position-absolute top-50 start-50 translate-middle rounded-circle"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(100, 100, 255, 0.15) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row">
          <div className="col-lg-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-uppercase tracking-widest text-secondary small fw-bold mb-3 d-block">
                Designer & Developer
              </span>
              
              <h1 className="display-3 fw-bold text-white mb-4 lh-sm">
                Crafting digital <br />
                <span className="text-gradient">experiences.</span>
              </h1>
              
              <p className="text-secondary fs-5 mb-5 max-w-lg">
                I build modern, minimal interfaces that feel as good as they look.
              </p>

              <div className="d-flex gap-3">
                <a href="#work" className="btn btn-light btn-lg px-4 rounded-pill fw-medium">
                  View My Works
                </a>
                <a href="#contact" className="btn btn-outline-secondary btn-lg px-4 rounded-pill text-white border-secondary">
                  Contact Me
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}