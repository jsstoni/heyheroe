import { generateSlug, relativeDate } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { getOffers } from '../data';

export const dynamic = 'force-dynamic';

export default async function Work() {
  const offers = await getOffers();

  return (
    <>
      <section className="container px-4 py-16 md:px-8">
        <h3 className="mb-4 text-2xl drop-shadow-md">Ofertas de trabajo</h3>

        <div className="space-y-3">
          {offers.map((item) => (
            <Link
              className="group block"
              href={`/work/${generateSlug(`${item.subServices.service.name}-${item.subServices.name}`)}-tarea-${item.id}`}
              key={item.id}
            >
              <div className="rounded-lg border p-4 shadow-xs group-hover:shadow-lg">
                <div className="flex items-center">
                  <strong className="text-lg font-medium group-hover:text-amber-400">
                    {item.subServices.service.name} - {item.subServices.name}
                  </strong>
                </div>
                <p className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="size-3" />
                  Publicado {relativeDate(item.createdAt)}
                </p>
                <p className="mt-2">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
