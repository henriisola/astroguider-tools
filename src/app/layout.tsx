import '@/app/globals.css';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import { Cormorant_Garamond, DM_Mono, Outfit } from 'next/font/google';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
});

export const metadata = {
  title: "AstroGuider",
  description: "Symbolic Intelligence Platform",
  manifest: "/manifest.json",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: "#16181d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} dark bg-background text-foreground antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
