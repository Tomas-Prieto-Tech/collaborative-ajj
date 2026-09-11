import Image from 'next/image';
import mat from '../../assets/IMG_7234-preview.jpeg';

export default function Schedule() {
  return <><section className="page-title"><p className="eyebrow">Make time to train</p><h1>See you on<br /><em>the mats.</em></h1></section><section className="schedule section"><div><p className="schedule-lead">Our current class schedule is being updated. Get in touch to find the right class for you.</p><a className="button dark" href="mailto:info@collaborativeajj.com">Contact the academy <span>→</span></a></div><div className="schedule-image"><Image src={mat} alt="Jiu Jitsu training at The Collaborative" fill sizes="(max-width: 800px) 100vw, 48vw" /></div></section></>;
}
