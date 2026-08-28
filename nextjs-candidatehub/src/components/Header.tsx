"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header glass-panel">
      <div className="container header-container">
        <div className="logo">
          <Image src="/Logo.png" alt="CandidateHub Logo" width={32} height={32} className="logo-img" />
          <span>CandidateHub</span>
        </div>
        <nav className={`main-nav${menuOpen ? " mobile-active" : ""}`} id="mainNav">
          <Link href="/markis" onClick={() => setMenuOpen(false)}>Markis AI</Link>
          <Link href="/platform" onClick={() => setMenuOpen(false)}>Platform</Link>
          <Link href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/insights" onClick={() => setMenuOpen(false)}>Insights</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <div className="mobile-cta-group">
            <Link href="/trial" className="btn btn-secondary nav-btn-trial" style={{ background: '#fff', color: 'var(--primary)', border: '1px solid var(--primary)' }} onClick={() => setMenuOpen(false)}>
              Start Free Trial
            </Link>
            <Link href="/demo" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Book a Demo</Link>
          </div>
        </nav>
        <div className="header-actions">
          <Link href="/trial" className="btn btn-secondary nav-btn-trial" style={{ marginRight: '0.5rem', background: '#fff', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
            Start Free Trial
          </Link>
          <Link href="/demo" className="btn btn-primary">Book a Demo</Link>
        </div>
        <button
          className="mobile-menu-btn"
          id="mobileMenuBtn"
          aria-label="Toggle Navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>
    </header>
  );
}
