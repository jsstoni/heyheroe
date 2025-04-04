import type { Metadata } from 'next';
import './globals.css';
import { Manrope } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    template: 'HeyHeroe | %s',
    default: 'HeyHeroe',
  },
  description:
    'Desde limpieza hasta reparaciones, tenemos más de 27 servicios para tu hogar, encuentra profesionales y recibe las mejores ofertas.',
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`bg-white text-gray-700 ${manrope.className}`}>
      <body className={`antialiased`}>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
