import prisma from '@/lib/db';
import FormService from './_components/form';

interface PropsParams {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-static';

const getData = async (id: string) => {
  try {
    const data = await prisma.subServices.findUnique({
      where: {
        id: +id,
      },
      select: {
        name: true,
        service: {
          select: {
            name: true,
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
  const subServices = await prisma.subServices.findMany({
    where: { active: true, service: { active: true } },
    select: {
      id: true,
      service: { select: { slug: true } },
    },
  });

  return subServices.map((subService) => ({
    slug: subService.service.slug,
    id: subService.id.toString(),
  }));
}

export default async function Sub({ params }: PropsParams) {
  const { id } = await params;
  const data = await getData(id);

  if (!data) {
    return <h1>Sub service not found</h1>;
  }

  return (
    <>
      <div className="bg-linear-to-b from-indigo-100 to-white p-14 text-center">
        <h1 className="text-5xl">{data.service.name}</h1>
        <h2 className="text-2xl text-zinc-400">{data.name}</h2>
      </div>

      <div className="mx-auto max-w-3xl">
        <FormService />
      </div>
    </>
  );
}
