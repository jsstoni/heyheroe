import { commune } from '@/constants/commune';
import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CoverageSection() {
  const cities = commune
    .filter(({ active, home }) => active && home)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center md:px-8">
        <h3 className="mb-1 text-2xl font-black md:text-4xl">
          Cobertura de servicios
        </h3>
        <h4 className="mx-auto mb-12 max-w-md text-gray-600">
          Explora nuestra área de servicio en la Quinta Región de Chile
        </h4>

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {cities.map(({ name: city, id: index }) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-lg bg-gray-50 p-4 shadow-sm"
            >
              <MapPin className="text-primary-500 mr-2 h-5 w-5" />
              <span>{city}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/coverage"
            className="text-primary-500 hover:text-primary-600 inline-flex items-center font-medium"
          >
            Ver todas las zonas de cobertura
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
