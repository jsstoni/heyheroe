import { ActiveLink } from '@/components/active-link';
import { Footer } from '@/components/footer';
import CoverageSection from '@/components/home/coverage-section';
import ProfesionalCTA from '@/components/home/cta-profesional';
import HowItWorks from '@/components/home/how-it-works';
import SearchService from '@/components/search';
import Button from '@/components/ui/button';
import steps from '@/constants/steps-client';
import prisma from '@/lib/db';
import { ArrowRight, Search, Star } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

const getData = async () => {
  try {
    const [services, total] = await prisma.$transaction([
      prisma.services.findMany({
        where: {
          active: true,
        },
        orderBy: {
          name: 'asc',
        },
      }),
      prisma.subServices.count({
        where: {
          active: true,
          service: {
            active: true,
          },
        },
      }),
    ]);

    return { services, total };
  } catch (error) {
    console.error(error);
    return { services: [], total: 0 };
  }
};

export const metadata: Metadata = {
  title: 'Tu hogar, en manos expertas',
};

export default async function Home() {
  const { services, total } = await getData();

  return (
    <>
      <section className="bg-primary-100 relative py-6 md:pt-20 md:pb-0">
        <div className="container items-start px-4 max-sm:pt-5 md:flex md:gap-16 md:p-0">
          <div className="mt-8 flex-1 space-y-4">
            <span className="bg-primary-300 text-primary-700 inline-block rounded-full px-3 py-1 font-medium">
              +{total} servicios profesionales.
            </span>
            <h1 className="text-5xl font-black text-balance md:text-6xl">
              Tu hogar, en manos{' '}
              <span className="relative z-10 text-green-600">expertas</span>
            </h1>
            <h2 className="text-lg font-medium text-gray-500">
              Desde limpieza hasta reparaciones, tenemos más de{' '}
              <span className="text-primary-600">{total} servicios</span> para
              tu hogar.
            </h2>

            <div className="border-primary-500 relative rounded-lg border-2">
              <Search className="pointer-events-none absolute top-3.5 left-3 z-10 h-5 w-5 text-gray-400" />
              <SearchService />
              <Button
                className="absolute inset-y-0 right-0 flex items-center rounded-l-none"
                variant="primary"
              >
                Buscar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <figure className="relative hidden flex-1 md:block">
            <img
              src="/hero.png"
              className="h-[450px] w-full rounded-xl"
              title="héroe - limpieza en general"
              alt="heyhéroe"
            />

            <div className="absolute -right-20 bottom-10 w-[180px] rounded-lg bg-white p-3 shadow-lg">
              <strong className="text-sm">Limpieza</strong>
              <span className="block text-xs text-gray-400">
                Limpieza en general
              </span>
            </div>

            <div className="absolute top-16 -left-10 flex w-[200px] items-center gap-2 rounded-2xl bg-white p-2 shadow-xl">
              <div className="size-12 rounded-full bg-gray-200"></div>
              <div className="flex flex-col">
                <span>Martin G.</span>
                <div className="flex items-center gap-1">
                  <Star className="size-3 fill-yellow-400 stroke-yellow-400" />
                  <Star className="size-3 fill-yellow-400 stroke-yellow-400" />
                  <Star className="size-3 fill-yellow-400 stroke-yellow-400" />
                  <Star className="size-3 fill-yellow-400 stroke-yellow-400" />
                  <Star className="size-3 fill-yellow-400 stroke-yellow-400" />
                  <span className="text-xs text-gray-400">5.0</span>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 md:px-8">
        <HowItWorks
          subtitle="En solo tres pasos podrás encontrar al profesional perfecto para tus necesidades"
          steps={steps}
        />
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-4xl font-black">
            Conoce nuestras categorías
          </h3>
          <h4 className="mx-auto mb-10 max-w-md text-center">
            Ofrecemos una amplia variedad de servicios profesionales para todas
            tus necesidades
          </h4>
          <nav className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {services.map((service) => (
              <ActiveLink
                key={service.id}
                className="group relative flex flex-col gap-2 overflow-hidden rounded-xl bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                href={`/services/${service.slug}`}
                title={service.name}
              >
                <div className="absolute -top-8 -right-8 size-16 rounded-full bg-indigo-600 opacity-10 transition-transform group-hover:scale-150" />
                <img
                  className="size-7"
                  src={`/svgs/${service.icon}.svg`}
                  alt={service.name}
                  title={service.name}
                />
                <h3 className="group-hover:text-primary-500 font-semibold">
                  {service.name}
                </h3>
                <span className="text-sm text-gray-500">
                  {service.description}
                </span>
              </ActiveLink>
            ))}
          </nav>
        </div>
      </section>

      <CoverageSection />

      <ProfesionalCTA />

      <Footer />
    </>
  );
}
