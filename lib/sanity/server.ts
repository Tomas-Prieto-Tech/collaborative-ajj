import 'server-only';
import { unstable_cache } from 'next/cache';
import { activeAnnouncements, announcementsQuery, galleryQuery, type Announcement, type Gallery } from './content';

async function query<T>(groq: string): Promise<T> {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || 'production';
  if (!projectId || !/^[a-z0-9-]+$/.test(projectId) || !/^[a-z0-9_-]+$/.test(dataset)) {
    throw new Error('Configure SANITY_PROJECT_ID and SANITY_DATASET.');
  }
  const url = new URL(`https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}`);
  url.searchParams.set('query', groq);
  url.searchParams.set('perspective', 'published');
  const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`Sanity query failed (${response.status}).`);
  const body = await response.json() as { result: T };
  if (!Object.hasOwn(body, 'result')) throw new Error('Invalid Sanity response.');
  return body.result;
}

const scope = [process.env.SANITY_PROJECT_ID || 'unconfigured', process.env.SANITY_DATASET || 'production'];
const cachedGallery = unstable_cache(() => query<Gallery>(galleryQuery), ['gallery', ...scope], { revalidate: 60 });
const cachedAnnouncements = unstable_cache(async () => activeAnnouncements(await query<Announcement[]>(announcementsQuery)), ['announcements', ...scope], { revalidate: 60 });

// Catch outside the cache: failed regenerations retain the last successful value.
export async function getGallery(): Promise<Gallery | undefined> {
  try { return await cachedGallery(); }
  catch (error) { console.error('Gallery unavailable:', error); return undefined; }
}
export async function getAnnouncements(): Promise<Announcement[]> {
  try { return await cachedAnnouncements(); }
  catch (error) { console.error('Announcements unavailable:', error); return []; }
}
