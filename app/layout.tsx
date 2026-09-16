import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

export const metadata: Metadata = {
  title: 'The Collaborative Bakersfield Gracie Allegiance Jiu Jitsu',
  description: 'The Collaborative Bakersfield Gracie Allegiance Jiu Jitsu is a community-driven Jiu Jitsu academy in Bakersfield, California.',
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
