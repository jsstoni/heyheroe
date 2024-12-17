import prisma from '@/lib/db';
import { WorkService } from './_components/work';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function Work() {
  const services = await prisma.services.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      subServices: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return (
    <>
      <WorkService services={services} />

      <h3 className="text-2xl font-extrabold text-zinc-500 drop-shadow-md">
        Trabajos destacados
      </h3>
    </>
  );
}
