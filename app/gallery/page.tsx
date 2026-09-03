import Image from 'next/image';
import one from '../../IMG_5609.jpeg';
import two from '../../IMG_6862.jpeg';
import three from '../../IMG_7232.jpeg';
import four from '../../IMG_6921.jpeg';
import five from '../../IMG_6938.jpeg';
import six from '../../IMG_6954.jpeg';
import seven from '../../IMG_6932.jpeg';
import eight from '../../IMG_3550.jpeg';
import nine from '../../IMG_7219.jpg';
const images = [one, two, three, four, five, six, seven, eight, nine];
export default function Gallery() { return <><section className="page-title gallery-title"><p className="eyebrow">The Collaborative in motion</p><h1>Built together.<br /><em>Captured here.</em></h1></section><section className="gallery">{images.map((image, index) => <figure key={index}><Image src={image} alt={`Collaborative AJJ moment ${index + 1}`} fill sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw" /></figure>)}</section></>; }
