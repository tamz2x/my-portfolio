"use client";

import { motion } from "framer-motion";

export default function Contact() {
  const contacts = [
    {
      name: "Email",
      value: "macs.webprojects@gmail.com",
      href: "mailto:macs.webprojects@gmail.com",
      icon: "bi-envelope-fill",
    },
    {
      name: "Facebook",
      value: "/macscybernatics",
      href: "https://www.facebook.com/macscybernatics",
      icon: "bi-facebook",
    },
    {
      name: "GitHub",
      value: "/macswebprojects-cybernatics",
      href: "https://github.com/macswebprojects-cybernatics",
      icon: "bi-github",
    },
  ];

  return (
    <section id="contact" className="py-5 my-5 position-relative overflow-hidden">
      {/* Background glow */}
      <div
        className="position-absolute top-50 start-50 translate-middle rounded-circle"
        style={{
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(100, 100, 255, 0.08) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className="display-5 fw-bold text-white mb-3">
            Let's Work Together
          </h2>
          <p
            className="text-secondary mx-auto"
            style={{ maxWidth: "600px" }}
          >
            Have a project in mind? I'm always open to new opportunities and
            interesting ideas. Drop me a line and let's build something great.
          </p>
        </motion.div>

        <div className="row g-4 justify-content-center mb-5">
          {contacts.map((contact, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={contact.name}>
              <motion.a
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-decoration-none d-block"
              >
                <div
                  className="card bg-dark border-0 h-100 contact-card text-center p-4"
                  style={{
                    borderRadius: "16px",
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div className="mb-3">
                    <i
                      className={`bi ${contact.icon} text-white`}
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                  <h5 className="fw-bold text-white mb-2">{contact.name}</h5>
                  <p className="text-secondary small mb-0 text-truncate">
                    {contact.value}
                  </p>
                </div>
              </motion.a>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="mailto:macs.webprojects@gmail.com"
            className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-medium"
          >
            Send Me an Email <i className="bi bi-arrow-right ms-2"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}