import assert from 'node:assert/strict';
import test from 'node:test';
import { galleryImageUrl } from '../lib/sanity/images.ts';

test('image URLs carry crop settings and tall slot dimensions', () => {
  process.env.SANITY_PROJECT_ID = 'testproject';
  process.env.SANITY_DATASET = 'production';
  const photo = { _key: 'photo', alt: 'Training', asset: { _ref: 'image-abcdef-2000x1000-jpg' }, crop: { left: 0.1, right: 0.1, top: 0, bottom: 0 }, hotspot: { x: 0.7, y: 0.5, width: 0.1, height: 0.1 } };
  const normal = new URL(galleryImageUrl(photo));
  const tall = new URL(galleryImageUrl(photo, true));
  assert.equal(normal.hostname, 'cdn.sanity.io');
  assert.equal(normal.searchParams.get('h'), '750');
  assert.equal(tall.searchParams.get('h'), '1500');
  assert.ok(normal.searchParams.has('rect'));
  assert.notEqual(galleryImageUrl(photo), galleryImageUrl({ ...photo, hotspot: { ...photo.hotspot, x: 0.3 } }));
});
