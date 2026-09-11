import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-02-19' }).withConfig({ useCdn: false, perspective: 'raw' });
const marker = 'gallery-initial-import-v1';
const existing = await client.fetch<number>('count(*[_id in $ids])', { ids: ['gallery', 'drafts.gallery', marker] });
if (existing) {
  console.log('Import skipped: gallery, draft, or completed import already exists. Owner changes are preserved.');
} else {
  const originals = [
    ['IMG_5609.jpeg', 'Jiu jitsu students and coaches posing on the mats beneath an American flag.'],
    ['IMG_6863-preview.jpeg', 'Five athletes standing together beneath the Clark Gracie Jiu-Jitsu wall logo.'],
    ['IMG_7234-preview.jpeg', 'Three jiu jitsu athletes in white and black uniforms on blue training mats.'],
    ['IMG_6922-preview.jpeg', 'A referee raising a competitor’s hand after a jiu jitsu match.'],
    ['IMG_6938-preview.jpeg', 'A competitor in a white gi with an arm raised beside a referee and an opponent in black.'],
    ['IMG_6954-preview.jpeg', 'The team gathered outside a competition venue, with several athletes wearing medals.'],
    ['IMG_6931-preview.jpeg', 'A referee standing between two jiu jitsu competitors in a crowded tournament arena.'],
    ['IMG_3550-preview.jpeg', 'Three athletes posing beneath the Clark Gracie Jiu-Jitsu logo after training.'],
    ['IMG_6945-preview.jpeg', 'Eight teammates standing outside a competition venue, several wearing medals.'],
  ];
  const photos = [];
  for (const [filename, alt] of originals) {
    const asset = await client.assets.upload('image', createReadStream(fileURLToPath(new URL(`../../assets/${filename}`, import.meta.url))), { filename });
    photos.push({ _type: 'photo', _key: filename.split('.')[0].toLowerCase(), asset: { _type: 'reference', _ref: asset._id }, alt });
  }
  // Recheck after uploads. createIfNotExists also protects a concurrently published gallery.
  if (await client.fetch<number>('count(*[_id in $ids])', { ids: ['gallery', 'drafts.gallery', marker] })) {
    console.log('Import skipped: content was created during upload.');
  } else {
    await client.transaction()
      .createIfNotExists({ _id: 'gallery', _type: 'gallery', photos })
      .createIfNotExists({ _id: marker, _type: 'migration', completedAt: new Date().toISOString() })
      .commit();
    console.log('Imported the original nine photos in order.');
  }
}
