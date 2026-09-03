import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

export const metadata: Metadata = {
  title: 'The Collaborative | American Jiu Jitsu',
  description: 'A community-driven Jiu Jitsu academy in Bakersfield, California.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
