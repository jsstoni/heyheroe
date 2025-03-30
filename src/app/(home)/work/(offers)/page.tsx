import { getCommuneById } from '@/constants/commune';
import { generateSlug, relativeDate } from '@/lib/utils';
import CategoryFilter from '#/home/_components/category-filter';
import { getOffers } from '#/home/work/data';
import { filterParamsCache } from '#/home/work/searchParams';
import { Briefcase, Calendar, Filter, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import CityFilter from '../../_components/city-filter';

export const metadata: Metadata = {
  title: 'Ofertas de trabajo',
  description:
    '¿Buscas trabajo? Aquí puedes encontrar oportunidades que se ajustan a ti.',
};

export const dynamic = 'force-dynamic';

async function WorkList() {
  const { category, commune } = filterParamsCache.all();

  const offers = await getOffers(category, commune);

  if (offers.length < 1) {
    return (
      <div>
        <p>No hay ofertas disponibles.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {offers.map((item) => (
        <Link
          className="group block"
          href={`/work/${generateSlug(`${item.subServices.service.name}-${item.subServices.name}`)}-tarea-${item.id}`}
          key={item.id}
        >
          <div className="rounded-lg border bg-white p-4 shadow-xs group-hover:shadow-lg">
            <div className="flex items-center">
              <strong className="group-hover:text-primary-500 text-lg font-medium">
                {item.subServices.service.name} - {item.subServices.name}
              </strong>
            </div>
            <p className="flex items-center gap-1 text-sm text-gray-400">
              <Calendar className="size-3" />
              Publicado {relativeDate(item.createdAt)}
              <MapPin className="ml-2 size-3" />
              {getCommuneById(item.commune)}
            </p>
            <p className="mt-2">{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default async function Work({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await filterParamsCache.parse(searchParams);

  return (
    <>
      <section className="container flex flex-col p-4 py-10 md:flex-row md:gap-8 md:px-0">
        <div className="relative w-full self-start rounded-lg border bg-white p-4 shadow-xs md:w-72">
          <p className="mb-2 flex items-center gap-1 text-lg font-medium">
            <Filter className="size-4" /> Filtros
          </p>

          <CategoryFilter />

          <hr className="my-3" />

          <CityFilter />
        </div>

        <div className="flex-1">
          <h3 className="mb-4 flex items-center gap-2 text-2xl drop-shadow-md">
            <Briefcase className="size-5" /> Ofertas de trabajo
          </h3>

          <Suspense fallback="loading...">
            <WorkList />
          </Suspense>
        </div>
      </section>
    </>
  );
}
