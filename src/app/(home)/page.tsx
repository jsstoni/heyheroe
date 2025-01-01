import { ActiveLink } from '@/components/active-link';
import prisma from '@/lib/db';

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
      <div className="container mx-auto flex h-[300px] items-center">
        <div className="space-y-3">
          <h1 className="text-5xl font-bold drop-shadow-md">
            Más de {total} servicios disponibles en un solo lugar.
          </h1>
          <h2 className="text-2xl drop-shadow-md">
            Encuentra profesionales y contrata servicios para todo lo que
            necesitas.
          </h2>
        </div>

        <img
          className="max-h-[360px] w-[640px]"
          src="/svgs/service.svg"
          alt=""
        />
      </div>

      <div className="container mx-auto">
        <nav className="mb-20 mt-5 grid gap-4 md:grid-cols-4">
          {services.map((service) => (
            <ActiveLink
              key={service.id}
              href={`/services/${service.slug}`}
              className="group relative flex flex-col gap-2 overflow-hidden rounded-md border bg-white p-3 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute -right-8 -top-8 size-16 rounded-full bg-indigo-600 opacity-10 transition-transform group-hover:scale-150" />
              <img
                className="size-7"
                src={`/svgs/${service.icon}.svg`}
                alt={service.name}
              />
              {service.name}
            </ActiveLink>
          ))}
        </nav>

        <h3 className="mt-20 text-3xl">¿Cómo funciona?</h3>
        <p className="text-gray-400">Servicio para el cliente.</p>

        <div className="my-10 grid gap-10 md:grid-cols-3">
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
