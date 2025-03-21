import { ActiveLink } from '@/components/active-link';
import { Footer } from '@/components/footer';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import steps from '@/constants/steps-client';
import prisma from '@/lib/db';
import CoverageSection from '#/home/_components/coverage-section';
import ProfesionalCTA from '#/home/_components/cta-profesional';
import HowItWorks from '#/home/_components/how-it-works';
import { ArrowRight, Search } from 'lucide-react';

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

export async function generateStaticParams() {
  const { services } = await getData();

  if (!services) {
    return [];
  }

  return services.map((service) => ({ id: service.slug }));
}

export default async function Home() {
  const { services, total } = await getData();

  return (
    <>
      <section className="to-primary-100 relative overflow-hidden bg-gradient-to-br from-amber-50 py-6 md:py-26">
        <div className="container mx-auto items-center px-4 max-sm:pt-5 md:flex md:gap-6 md:p-0">
          <div className="space-y-4">
            <h1 className="text-5xl font-black md:text-6xl">
              Tu hogar, en manos expertas.
            </h1>
            <h2 className="text-lg text-gray-500">
              Desde limpieza hasta reparaciones, tenemos más de{' '}
              <span className="text-primary-600">{total} servicios</span> para
              tu hogar.
            </h2>

            <div className="relative mb-8 max-w-md">
              <Search className="pointer-events-none absolute top-4 left-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                className="bg-white py-6 pl-10"
                placeholder="¿Qué servicio necesitas?"
              />
              <Button
                className="absolute inset-y-0 right-0 flex items-center rounded-l-none"
                variant="primary"
              >
                Buscar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <img
            className="max-h-[380px] max-md:hidden"
            src="/svgs/service.svg"
            alt=""
          />
          <div className="bg-primary-200 absolute top-0 left-0 hidden h-32 w-32 rounded-br-full opacity-50 lg:block"></div>
          <div className="bg-primary-200 absolute right-0 bottom-0 hidden h-44 w-44 rounded-tl-full opacity-50 lg:block"></div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:px-8">
        <HowItWorks steps={steps} />
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="mb-10 text-center text-3xl font-bold">
            Conoce nuestras categorías
          </h3>
          <nav className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {services.map((service) => (
              <ActiveLink
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative flex flex-col gap-2 overflow-hidden rounded-xl bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute -top-8 -right-8 size-16 rounded-full bg-indigo-600 opacity-10 transition-transform group-hover:scale-150" />
                <img
                  className="size-7"
                  src={`/svgs/${service.icon}.svg`}
                  alt={service.name}
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
