import { ActiveLink } from '@/components/active-link';
import { Footer } from '@/components/footer';
import CoverageSection from '@/components/home/coverage-section';
import ProfesionalCTA from '@/components/home/cta-profesional';
import HowItWorks from '@/components/home/how-it-works';
import steps from '@/constants/steps-client';
import prisma from '@/lib/prisma/db';
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
      <section className="relative">
        <div className="relative container mx-auto px-4 pt-12 text-center text-balance md:px-8">
          <div className="mx-auto max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 font-medium text-primary">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
              </span>
              +{total} servicios profesionales.
            </div>
            <h1 className="text-5xl font-black text-balance md:text-7xl">
              Tu hogar, en manos{' '}
              <span className="relative z-10 text-primary">expertas</span>
            </h1>
            <h2 className="text-xl text-gray-500">
              Desde limpieza hasta reparaciones, tenemos más de{' '}
              <span className="text-accent">{total} servicios</span> para tu
              hogar.
            </h2>
          </div>
        </div>

        <nav className="container mx-auto mt-5 grid grid-cols-2 gap-3 rounded-lg bg-gray-100 p-3 shadow-inner md:grid-cols-3 md:gap-6 md:p-6">
          {services.map((service) => (
            <ActiveLink
              key={service.id}
              className="group relative flex flex-col items-start gap-2 overflow-hidden rounded-xl bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl md:gap-4 lg:flex-row"
              href={`/services/${service.slug}`}
              title={service.name}
            >
              <div className="rounded-lg bg-gray-100 p-2">
                <img
                  className="size-10"
                  src={`/svgs/${service.icon}.svg`}
                  alt={service.name}
                  title={service.name}
                />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-primary">
                  {service.name}
                </h3>
                <span className="text-sm text-gray-500">
                  {service.description}
                </span>
              </div>
            </ActiveLink>
          ))}
        </nav>
      </section>

      <section className="container mx-auto px-4 py-20 md:px-0">
        <HowItWorks
          subtitle="En solo tres pasos podrás encontrar al profesional"
          steps={steps}
        />
      </section>

      <CoverageSection />

      <ProfesionalCTA />

      <Footer />
    </>
  );
}
