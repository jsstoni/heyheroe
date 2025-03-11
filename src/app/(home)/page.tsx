import CoverageSection from '@/app/(home)/_components/coverage-section';
import { ActiveLink } from '@/components/active-link';
import { Footer } from '@/components/footer';
import HowItWorks from '@/components/how-it-works';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import prisma from '@/lib/db';
import { ArrowRight, Search } from 'lucide-react';
import ProfesionalCTA from './_components/cta-profesional';

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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-amber-100 py-6 md:py-26">
        <div className="container mx-auto items-center max-sm:px-4 max-sm:pt-5 md:flex md:gap-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-black">
              Más de <span className="text-amber-400">{total} servicios</span>{' '}
              en un solo lugar.
            </h1>
            <h2 className="text-xl text-gray-500">
              Encuentra profesionales y contrata servicios para todo lo que
              necesitas.
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
          <div className="absolute top-0 left-0 hidden h-32 w-32 rounded-br-full bg-amber-200 opacity-50 lg:block"></div>
          <div className="absolute right-0 bottom-0 hidden h-44 w-44 rounded-tl-full bg-amber-200 opacity-50 lg:block"></div>
        </div>
      </section>

      <section className="container mx-auto py-16 max-sm:px-4">
        <HowItWorks steps={steps} />
      </section>

      <section className="bg-gray-50 py-16 max-sm:px-4">
        <div className="container mx-auto">
          <h3 className="mb-10 text-center text-3xl font-bold">
            Conoce nuestras categorías
          </h3>
          <nav className="grid grid-cols-2 gap-6 md:grid-cols-4">
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
                <h3 className="font-semibold group-hover:text-amber-500">
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

const steps = [
  {
    title: 'Encuentra el servicio',
    description:
      'Explora nuestras categorías y selecciona el servicio que necesitas.',
  },
  {
    title: 'Recibe propuestas',
    description:
      'Revisa perfiles, elige al profesional adecuado y agenda el servicio.',
  },
  {
    title: 'Deja tu reseña',
    description:
      'Comparte tu experiencia y ayuda a otros a encontrar a los mejores héroes.',
  },
];
