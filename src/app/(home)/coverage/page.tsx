import { Footer } from '@/components/footer';
import { commune } from '@/constants/commune';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cobertura',
};

export default function Coverage() {
  const cities = commune.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="mb-1 text-center text-2xl font-bold md:text-3xl">
            Comunas donde operamos
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
            Encuentra profesionales en todas las comunas de la Quinta Región
          </p>

          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {cities.map(({ name: city, id: index, active }) => (
              <div
                key={index}
                className={cn(
                  'flex items-center rounded-lg bg-white p-4 shadow-sm',
                  !active && 'border border-red-200'
                )}
              >
                <MapPin
                  className={cn(
                    'text-primary-500 mr-2 h-5 w-5',
                    !active && 'stroke-red-200'
                  )}
                />
                <span>{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
