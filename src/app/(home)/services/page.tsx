import { Footer } from '@/components/footer';
import prisma from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-static';

const getData = async () => {
  try {
    const services = await prisma.services.findMany({
      orderBy: {
        name: 'asc',
      },
      where: {
        active: true,
      },
      include: {
        subServices: {
          where: {
            active: true,
          },
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            name: 'asc',
          },
        },
      },
    });
    return services;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function AllService() {
  const data = await getData();

  return (
    <>
      <section className="bg-gray-50 py-14">
        <h1 className="text-center text-2xl font-bold md:text-3xl">
          Todos nuestros servicios profesionales
        </h1>
        <p className="mb-6 text-center">
          Encuentra el servicio que necesitas entre nuestras categorías
          especializadas
        </p>

        <div className="container mx-auto grid grid-cols-2 gap-4 px-4 py-5 md:grid-cols-3 md:px-8">
          {data.map((service) => (
            <div
              className="rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              key={service.id}
            >
              <h3 className="mb-2 text-xl font-medium">{service.name}</h3>
              <p className="text-gray-500">{service.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {service.subServices.map((sub) => (
                  <Link
                    className="rounded-full bg-amber-50 px-3 py-1.5 text-xs text-amber-600 hover:bg-amber-100 hover:text-amber-700"
                    href={`/services/${service.slug}/${sub.id}`}
                    key={sub.id}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
