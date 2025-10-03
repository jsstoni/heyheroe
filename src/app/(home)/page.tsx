import { ActiveLink } from '@/components/active-link';
import { Footer } from '@/components/footer';
import CoverageSection from '@/components/home/coverage-section';
import ProfesionalCTA from '@/components/home/cta-profesional';
import HowItWorks from '@/components/home/how-it-works';
import Button from '@/components/ui/button';
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
        <div className="container relative mx-auto flex h-[540px] flex-col justify-center">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 font-medium text-primary">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
              </span>
              +{total} servicios profesionales.
            </div>
            <h1 className="text-balance font-black text-5xl md:text-7xl">
              Tu hogar, en manos{' '}
              <span className="relative z-10 text-primary">expertas</span>
            </h1>
            <h2 className="text-gray-500 text-xl">
              Conecta con profesionales verificados para jardinería, limpieza y
              más—todo en una plataforma fácil de usar.
            </h2>

            <hgroup className="mt-6 flex items-center gap-4">
              <Button variant="primary" className="p-2 px-8 text-lg">
                Explorar servicios
              </Button>
              <Button>Únete como profesional</Button>
            </hgroup>
          </div>
          <div className="-z-10 absolute inset-0 top-4 size-full rounded-r-3xl bg-[url(/bg.jpg)] bg-center bg-cover bg-no-repeat object-cover">
            <div
              className="absolute inset-0 size-full"
              style={{
                background:
                  'linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.9) 40%, rgba(255, 255, 255, 0) 65%)',
              }}
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 md:px-0">
        <HowItWorks
          subtitle="En solo tres pasos podrás encontrar al profesional"
          steps={steps}
        />
      </section>

      <section className="bg-gradient-to-b from-white to-gray-200 p-4 md:p-10">
        <hgroup className="mb-16 text-center">
          <h3 className="mb-2 text-3xl md:text-4xl">Servicios Profesionales</h3>
          <h4 className="text-gray-500">
            Cualquier servicio para el hogar que necesites, tenemos
            profesionales confiables listos para ayudar
          </h4>
        </hgroup>
        <nav className="container mx-auto mt-5 grid grid-cols-2 gap-3 rounded-lg md:grid-cols-3 md:gap-6">
          {services.map((service) => (
            <ActiveLink
              key={service.id}
              className="group hover:-translate-y-1 relative flex flex-col items-start gap-2 overflow-hidden rounded-xl bg-white p-3 shadow-sm transition-all hover:shadow-xl md:gap-4 lg:flex-row"
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
                <span className="text-gray-500 text-sm">
                  {service.description}
                </span>
              </div>
            </ActiveLink>
          ))}
        </nav>
      </section>

      <CoverageSection />

      <ProfesionalCTA />

      <Footer />
    </>
  );
}
