import { Footer } from '@/components/footer';
import { commune } from '@/contants/commune';
import { MapPin } from 'lucide-react';

export default function Coverage() {
  const cities = commune.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-sm:px-4">
          <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
            Comunas donde operamos
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
            Encuentra profesionales en todas las comunas de la Quinta Región
          </p>

          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {cities.map(({ name: city, id: index }) => (
              <div
                key={index}
                className="flex items-center rounded-lg bg-white p-4 shadow-sm"
              >
                <MapPin className="mr-2 h-5 w-5 text-amber-500" />
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
