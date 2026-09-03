import Image from 'next/image';
import Link from 'next/link';
import hero from '../IMG_5609.jpeg';
import team from '../IMG_6862.jpeg';

export default function Home() {
  return <>
    <section className="hero">
      <Image src={hero} alt="The Collaborative Jiu Jitsu team on the mats" fill priority sizes="100vw" />
      <div className="hero-shade" />
      <div className="hero-content"><p className="eyebrow">Bakersfield, California</p><h1>Find your people.<br /><em>Build your game.</em></h1><p className="hero-copy">Jiu Jitsu for every level, built around community.</p><Link className="button" href="/schedule">View schedule <span>→</span></Link></div>
      <p className="hero-side">The Collaborative<br />American Jiu Jitsu</p>
    </section>
    <section className="intro section"><div className="intro-photo"><Image src={team} alt="Collaborative AJJ athletes" fill sizes="(max-width: 760px) 100vw, 43vw" /></div><div><p className="eyebrow">More than a gym</p><h2>Come as you are.<br /><em>Leave stronger.</em></h2><p>Train Jiu Jitsu, challenge yourself, and be part of a team that has your back on and off the mats.</p><Link className="text-link" href="/about">Meet The Collaborative <span>→</span></Link></div></section>
    <section className="values"><div><p className="eyebrow">What we&apos;re about</p><h2>Good people.<br /><em>Real training.</em></h2></div><div className="value-list"><span>01 <b>Community first</b></span><span>02 <b>All levels welcome</b></span><span>03 <b>Progress together</b></span></div></section>
  </>;
}
