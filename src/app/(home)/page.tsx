import { ActiveLink } from '@/components/active-link';
import prisma from '@/lib/db';

export const dynamic = 'force-static';
export const revalidate = 60;

export default async function Home() {
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

  return (
    <>
      <div className="container gap-8 py-10">
        <div className="space-y-5">
          <div>
            <h1 className="text-4xl font-bold drop-shadow-md">
              Más de {total} tipos de servicios en un solo lugar.
            </h1>
            <h2 className="text-2xl drop-shadow-md">
              Encuentra profesionales y contrata servicios para todo lo que
              necesitas.
            </h2>
          </div>

          <nav className="grid gap-4 rounded-md border-2 border-gray-400 bg-indigo-100 p-4 shadow-[4px_4px_0px_rgba(156,163,175,1)] md:grid-cols-4">
            {services.map((service) => (
              <ActiveLink
                key={service.id}
                href={`/services/${service.slug}`}
                className="flex items-center gap-2 text-xl transition-colors hover:text-orange-500"
              >
                <img
                  className="size-6"
                  src={`/svgs/${service.icon}.svg`}
                  alt={service.name}
                />
                {service.name}
              </ActiveLink>
            ))}
          </nav>
        </div>

        <h3 className="mt-20 text-3xl drop-shadow-md">¿Cómo funciona?</h3>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map(({ title, description }, index) => (
            <div className="relative bg-gray-100 p-5" key={index}>
              <div className="absolute -left-2 -top-2 size-4 border-l-2 border-t-2 border-zinc-400" />
              <div className="absolute -bottom-2 -right-2 size-4 border-b-2 border-r-2 border-zinc-400" />

              <strong className="absolute -top-6 flex size-12 items-center justify-center rounded-lg bg-gray-300 text-4xl text-zinc-600">
                {index + 1}
              </strong>

              <h4 className="my-4 text-2xl font-bold">{title}</h4>

              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const steps = [
  {
    title: 'Encuentra el servicio',
    description:
      'Explora nuestras categorías y selecciona el servicio que necesitas, todo de manera fácil y rápida.',
  },
  {
    title: 'Recibe propuestas',
    description:
      'Revisa perfiles, elige al profesional adecuado y agenda el servicio de manera fácil y segura.',
  },
  {
    title: 'Deja tu reseña',
    description:
      'Recibe el servicio, comparte tu experiencia y ayuda a otros a encontrar a los mejores héroes.',
  },
];
