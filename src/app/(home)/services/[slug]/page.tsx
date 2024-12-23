import prisma from '@/lib/db';
import Link from 'next/link';

interface PropsParams {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';

const getData = async (slug: string) => {
  try {
    const data = await prisma.services.findUnique({
      where: {
        active: true,
        slug: slug,
      },
      include: {
        subServices: {
          where: {
            active: true,
          },
          orderBy: {
            name: 'asc',
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function generateStaticParams() {
  const services = await prisma.services.findMany({
    where: { active: true },
    select: { slug: true },
  });

  return services.map((service) => ({ slug: service.slug }));
}

export default async function Service({ params }: PropsParams) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data) {
    return <h1>Service not found</h1>;
  }

  return (
    <>
      <div className="bg-indigo-100 p-14 text-center">
        <h1 className="text-5xl">{data.name}</h1>
      </div>

      <div className="container mt-5 grid gap-8 md:grid-cols-2">
        {data.subServices.map((service) => (
          <Link
            className="text-xl font-bold text-zinc-600 hover:text-orange-500"
            href={`/services/${data.slug}/${service.id}`}
            key={service.id}
          >
            {service.name}
            <span className="block text-xs font-normal">
              {service.description}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
