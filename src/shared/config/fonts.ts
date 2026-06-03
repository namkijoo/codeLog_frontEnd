import { Noto_Sans_KR, Noto_Sans_Mono } from 'next/font/google';

export const fontSans = Noto_Sans_KR({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

export const fontMono = Noto_Sans_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

export const fontVariables = `${fontSans.variable} ${fontMono.variable}`;
