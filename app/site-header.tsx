'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import logo from '../assets/collab-gracie final logo.png';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/instructors', label: 'Instructors' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/gallery', label: 'Gallery' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <Image src={logo} alt="The Collaborative American Jiu Jitsu" priority />
          <span>The Collaborative<small>American Jiu Jitsu</small></span>
        </Link>
        <div className="header-actions">
          <nav id="site-navigation" className={open ? 'open' : ''}>
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
          </nav>
          <a className="instagram-link" href="https://www.instagram.com/Collaborativeajj" aria-label="The Collaborative AJJ on Instagram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open} aria-controls="site-navigation">
            <i /><i />
          </button>
        </div>
      </div>
    </header>
  );
}
