import Image from 'next/image';
import instructor from '../../assets/IMG_3550-preview.jpeg';

export default function Instructors() {
  return <><section className="page-title"><p className="eyebrow">Learn from the team</p><h1>Guidance for<br /><em>every journey.</em></h1></section><section className="instructor-feature section"><div className="instructor-image"><Image src={instructor} alt="Collaborative AJJ instructor on the mats" fill sizes="(max-width: 800px) 100vw, 48vw" /></div><div><p className="eyebrow">The Collaborative team</p><h2>Built by practitioners,<br /><em>for practitioners.</em></h2><p>Our instructors pair a strong technical foundation with a collaborative approach—meeting every student where they are and helping them move forward.</p></div></section></>;
}
