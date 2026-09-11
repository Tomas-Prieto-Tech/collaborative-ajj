import Announcements from './announcements';

import Image from 'next/image';
import Link from 'next/link';
import hero from '../assets/IMG_5609.jpeg';
import team from '../assets/IMG_6863-preview.jpeg';

export const revalidate = 60;

export default function Home() {
  return <>
    <section className="hero">
      <Image src={hero} alt="The Collaborative Jiu Jitsu team on the mats" fill priority sizes="100vw" />
      <div className="hero-shade" />
      <div className="hero-content"><p className="eyebrow">Bakersfield, California</p><h1>Your journey.<br /><em>Our community.</em></h1><p className="hero-copy">Jiu Jitsu for every body, every level, and every journey.</p><Link className="button" href="/schedule">View schedule <span>→</span></Link></div>
      <p className="hero-side">The Collaborative<br />American Jiu Jitsu</p>
    </section>
    <Announcements />
    <section className="intro section"><div className="intro-photo"><Image src={team} alt="Collaborative AJJ athletes" fill sizes="(max-width: 760px) 100vw, 43vw" /></div><div><p className="eyebrow">More than a gym</p><h2>Come as you are.<br /><em>Grow together.</em></h2><p>A family-built academy where confidence, discipline, and lasting connections are made on and off the mats.</p><Link className="text-link" href="/about">Meet The Collaborative <span>→</span></Link></div></section>
    <section className="values"><div><p className="eyebrow">What we&apos;re about</p><h2>Train. Grow.<br /><em>Collaborate.</em></h2></div><div className="value-list"><span>01 <b>Community first</b></span><span>02 <b>Jiu Jitsu for everyone</b></span><span>03 <b>Learn and grow together</b></span></div></section>
  </>;
}
