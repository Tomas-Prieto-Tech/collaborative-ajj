export type GalleryPhoto = {
  _key: string;
  alt: string;
  asset: { _ref: string };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width: number; height: number };
};
export type Gallery = { photos: GalleryPhoto[] | null } | null;
export type Announcement = {
  _id: string;
  title: string;
  message: string;
  date: string;
  showThrough: string | null;
};

export const galleryQuery = '*[_type == "gallery" && _id == "gallery"][0]{photos[]{_key, alt, asset, crop, hotspot}}';
export const announcementsQuery = '*[_type == "announcement"]{_id, title, message, date, showThrough}';

export function californiaDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const part = (type: string) => parts.find(p => p.type === type)!.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

// Filter before limiting, and compute the date anew on every cache regeneration.
export function activeAnnouncements(posts: Announcement[], now = new Date()): Announcement[] {
  const today = californiaDate(now);
  return posts.filter(post => !post.showThrough || post.showThrough >= today)
    .sort((a, b) => b.date.localeCompare(a.date) || a._id.localeCompare(b._id))
    .slice(0, 3);
}

export function announcementDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric',
  }).format(new Date(`${date}T12:00:00Z`));
}
