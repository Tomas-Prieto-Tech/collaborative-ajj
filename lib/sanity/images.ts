import { createImageUrlBuilder } from '@sanity/image-url';
import type { GalleryPhoto } from './content';

export function galleryImageUrl(photo: GalleryPhoto, tall = false): string {
  return createImageUrlBuilder({
    projectId: process.env.SANITY_PROJECT_ID!,
    dataset: process.env.SANITY_DATASET || 'production',
  }).image(photo).width(1000).height(tall ? 1500 : 750).fit('crop').auto('format').url();
}
