import FormService from '@/components/forms/form-service';
import prisma from '@/lib/db';

interface PropsParams {
  params: Promise<{ sub: string }>;
}

export const dynamic = 'force-static';
export const revalidate = 60;

export default async function Sub({ params }: PropsParams) {
  const { sub } = await params;
  const data = await prisma.subServices.findUnique({
    where: {
      id: +sub,
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

  if (!data) {
    return <h1>Sub service not found</h1>;
  }

  return (
    <>
      <div className="bg-orange-50 p-14 text-center">
        <h1 className="text-5xl font-bold text-zinc-500">
          {data.service.name}
        </h1>
        <h2 className="text-3xl font-bold text-zinc-400">{data.name}</h2>
      </div>

      <div className="px-10">
        <FormService />
      </div>
    </>
  );
}
