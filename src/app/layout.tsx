import type { Metadata } from 'next';
import './globals.css';
import { Manrope } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

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
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
