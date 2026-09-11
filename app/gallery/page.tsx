import Image from 'next/image';
import { getGallery } from '../../lib/sanity/server';
import { galleryImageUrl } from '../../lib/sanity/images';

export const revalidate = 60;

export default async function Gallery() {
  const gallery = await getGallery();
  return <>
    <section className="page-title gallery-title"><p className="eyebrow">The Collaborative in motion</p><h1>Built together.<br /><em>Captured here.</em></h1></section>
    <section className="gallery" aria-label="Gallery photos">
      {gallery === undefined ? <p className="gallery-status">The gallery is temporarily unavailable. Please check back soon.</p>
        : !gallery?.photos?.length ? <p className="gallery-status">New photos are on the way. Check back soon.</p>
        : gallery.photos.map((photo, index) => <figure key={photo._key}>
          <Image src={galleryImageUrl(photo, index === 0 || index === 3)} alt={photo.alt} fill sizes="(max-width: 760px) 50vw, 33vw" />
        </figure>)}
    </section>
  </>;
}
