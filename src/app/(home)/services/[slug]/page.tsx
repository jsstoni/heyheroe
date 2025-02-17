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
      <div className="bg-linear-to-b from-indigo-100 to-white p-14 text-center">
        <h1 className="text-5xl">{data.name}</h1>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 py-5 md:grid-cols-2">
        {data.subServices.map((service) => (
          <Link
            className="group relative overflow-hidden rounded-md bg-white p-5 text-xl font-bold text-zinc-600 shadow-lg transition-all hover:-translate-y-1 hover:text-orange-500 hover:shadow-xl"
            href={`/services/${data.slug}/${service.id}`}
            key={service.id}
          >
            <div className="absolute -right-8 -top-8 size-16 rounded-full bg-indigo-600 opacity-10 transition-transform group-hover:scale-150" />
            {service.name}
            <span className="block text-sm font-normal">
              {service.description}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
