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
      <div className="container">
        <div className="grid grid-cols-2 py-5">
          {data.map((service) => (
            <div className="my-4" key={service.id}>
              <h3 className="mb-2 text-2xl underline">{service.name}</h3>
              <div className="flex flex-wrap gap-4">
                {service.subServices.map((sub) => (
                  <Link
                    className="text-zinc-500 hover:text-orange-500"
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
      </div>
    </>
  );
}
