import Image from 'next/image';
import instructor from '../../IMG_3550.jpeg';

export default function Instructors() {
  return <><section className="page-title"><p className="eyebrow">Learn from the team</p><h1>Guidance for<br /><em>every journey.</em></h1></section><section className="instructor-feature section"><div className="instructor-image"><Image src={instructor} alt="Collaborative AJJ instructor on the mats" fill sizes="(max-width: 800px) 100vw, 48vw" /></div><div><p className="eyebrow">The Collaborative team</p><h2>Built by practitioners,<br /><em>for practitioners.</em></h2><p>Our instructors bring experience, patience, and a shared commitment to helping every student grow.</p></div></section></>;
}
