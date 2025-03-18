import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 py-10 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-2xl font-bold">
              Hey<span className="text-primary-500">Héroe</span>
            </h3>
            <p className="text-gray-400">
              Conectamos tus necesidades con profesionales calificados.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Acerca de HeyHéroe</h4>
            <ul className="space-y-3 text-gray-400">
              {about.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item?.href || '#'}
                    className="hover:text-primary-500 flex items-center transition-colors"
                  >
                    <ArrowRight className="mr-2 h-3 w-3" />
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="stroke-primary-400 size-4" /> info@heyheroe.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="stroke-primary-400 size-4" /> +56 948 977 182
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="stroke-primary-400 size-4" /> Chile,
                Valparaíso
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} HeyHéroe. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

const about = [
  {
    title: 'Sobre nosotros',
    href: '#',
  },
  {
    title: 'Preguntas frecuentes',
    href: '#',
  },
  ,
  {
    title: 'Términos y condiciones',
    href: '#',
  },
  ,
  {
    title: 'Política de privacidad',
    href: '#',
  },
];
