"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Work", href: "/#work" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark" 
         style={{
           background: "rgba(10, 10, 10, 0.7)",
           backdropFilter: "blur(12px)",
           WebkitBackdropFilter: "blur(12px)",
           borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
         }}>
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold fs-4 tracking-tight">
          MACS Studio
        </Link>
        
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-4">
            {links.map((link) => (
              <li className="nav-item" key={link.name}>
                <Link 
                  href={link.href} 
                  className={`nav-link ${pathname === link.href ? 'text-white' : 'text-secondary'} hover-text-white transition-colors`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}