import { commune } from '@/contants/commune';
import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CoverageSection() {
  const selectedIds = [6, 14, 19, 28, 31, 32, 33, 34, 36, 37];
  const cities = commune
    .filter(({ id }) => selectedIds.includes(id))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="py-16">
      <div className="container mx-auto max-sm:px-4">
        <h3 className="mb-1 text-center text-2xl font-bold md:text-3xl">
          Cobertura de servicios
        </h3>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
          Explora nuestra área de servicio en la Quinta Región de Chile
        </p>

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {cities.map(({ name: city, id: index }) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-lg bg-gray-50 p-4 shadow-sm"
            >
              <MapPin className="mr-2 h-5 w-5 text-amber-500" />
              <span>{city}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/coverage"
            className="inline-flex items-center font-medium text-amber-500 hover:text-amber-600"
          >
            Ver todas las zonas de cobertura
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
