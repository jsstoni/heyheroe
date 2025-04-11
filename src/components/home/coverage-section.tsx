import { commune } from '@/constants/commune';
import { Citys } from '@/lib/types';
import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CoverageSection() {
  const cities: Citys[] = commune
    .filter(({ active, home }) => active && home)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="container px-4 pt-10 pb-16 md:px-0">
      <div className="flex items-start">
        <div>
          <h3 className="mb-1 text-2xl font-black md:text-3xl">
            Cobertura de servicios
          </h3>
          <h4 className="text-gray-600">
            Explora nuestra área de servicio en la Quinta Región de Chile
          </h4>
        </div>

        <Link
          href="/coverage"
          className="ml-auto inline-flex items-center rounded-lg border border-primary p-2 px-4 text-xs font-medium text-primary hover:text-accent"
        >
          Ver todas las zonas de cobertura
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
      <div className="mt-8 text-center">
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {cities.map(({ name: city, id: index }) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-full border bg-white p-2"
            >
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              <span>{city}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
