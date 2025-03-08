import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { Manrope } from 'next/font/google';

export const metadata: Metadata = {
  title: 'HeyHeroe',
  description: 'Encuentra las mejores ofertas.',
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`bg-white text-gray-800 ${manrope.className}`}>
      <body className={`antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
