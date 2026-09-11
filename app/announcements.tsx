import { getAnnouncements } from '../lib/sanity/server';
import { announcementDate } from '../lib/sanity/content';

export default async function Announcements() {
  const posts = await getAnnouncements();
  if (!posts.length) return null;
  return <section className="announcements section" aria-labelledby="announcements-heading">
    <p className="eyebrow">Around the academy</p>
    <h2 id="announcements-heading">Announcements</h2>
    <div className="announcement-list">{posts.map(post => <article key={post._id}>
      <time dateTime={post.date}>{announcementDate(post.date)}</time>
      <h3>{post.title}</h3><p>{post.message}</p>
    </article>)}</div>
  </section>;
}
