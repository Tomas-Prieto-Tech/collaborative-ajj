import Image from 'next/image';
import image from '../../IMG_6921.jpeg';

export default function About() {
  return <><section className="page-title"><p className="eyebrow">Our story</p><h1>A family on<br /><em>the mats.</em></h1></section><section className="about-grid section"><div className="about-image"><Image src={image} alt="A Collaborative AJJ competition moment" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className="about-copy"><p>Welcome to The Collaborative, a community-driven martial arts academy founded by a family of six, including first responders and veterans. With 15 years of experience, our mission is simple: to provide a welcoming space for individuals of all skill levels to train Jiu Jitsu and build supportive connections.</p><p>At our school, you&apos;ll find more than just martial arts instruction – you&apos;ll discover a family dedicated to helping you grow, both on and off the mats. Join us as we embrace the journey of Jiu Jitsu together. Welcome to The Collaborative family.</p></div></section></>;
}
