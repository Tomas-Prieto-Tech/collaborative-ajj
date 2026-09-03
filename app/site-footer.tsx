import Link from 'next/link';

export function SiteFooter() {
  return <footer><div className="footer-wrap"><span>© {new Date().getFullYear()} The Collaborative AJJ</span><span>Bakersfield, California</span><Link href="/schedule">Train with us →</Link></div></footer>;
}
