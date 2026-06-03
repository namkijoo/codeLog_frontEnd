import type { Metadata } from 'next';
import { AppProviders } from '@/app/providers';
import { fontVariables } from '@/shared/config/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'CodeLog',
  description: 'CodeLog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
