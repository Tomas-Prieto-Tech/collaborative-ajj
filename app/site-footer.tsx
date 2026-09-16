import Link from 'next/link';
import { AcademyAddress } from './academy-address';
import { AcademyContact } from './academy-contact';

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-wrap">
        <span>© {new Date().getFullYear()} The Collaborative</span>
        <AcademyAddress />
        <AcademyContact showInstagram={false} />
        <Link href="/schedule">Train with us →</Link>
      </div>
    </footer>
  );
}
