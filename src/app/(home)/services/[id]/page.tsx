import prisma from '@/lib/db';
import Link from 'next/link';

interface PropsParams {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-static';
export const revalidate = 60;

export default async function Service({ params }: PropsParams) {
  const { id } = await params;
  const data = await prisma.services.findUnique({
    where: {
      slug: id,
    },
    include: {
      subServices: true,
    },
  });

  if (!data) {
    return <h1>Service not found</h1>;
  }

  return (
    <>
      <div className="bg-indigo-400 p-14 text-center">
        <h1 className="text-5xl font-bold text-white">{data.name}</h1>
      </div>
      <div className="grid gap-8 px-10 md:grid-cols-2">
        {data.subServices.map((service) => (
          <Link
            className="text-xl font-bold text-zinc-600 hover:text-orange-500"
            href={`/services/${data.slug}/${service.id}`}
            key={service.id}
          >
            {service.name}
            <span className="block text-xs font-normal text-zinc-500">
              {service.description}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
