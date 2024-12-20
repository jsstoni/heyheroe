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
      <div className="bg-indigo-100 p-14 text-center">
        <h1 className="text-5xl">{data.service.name}</h1>
        <h2 className="text-2xl text-zinc-400">{data.name}</h2>
      </div>

      <div className="container mt-5">
        <FormService />
      </div>
    </>
  );
}
