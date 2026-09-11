'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import logo from '../assets/cajj-logo.png';

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
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
          <i /><i />
        </button>
        <nav className={open ? 'open' : ''}>
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
