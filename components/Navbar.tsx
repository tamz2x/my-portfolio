'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="navbar navbar-expand-md fixed-top" style={{
      background: 'rgba(10,10,10,0.75)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold text-white">YOUR_NAME</Link>
        <button className="navbar-toggler border-0 text-white" onClick={() => setOpen(!open)}>
          <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'} fs-4`}></i>
        </button>
        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto gap-md-4">
            <li className="nav-item"><a className="nav-link text-muted-custom" href="/#work">Work</a></li>
            <li className="nav-item"><a className="nav-link text-muted-custom" href="/#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}