import prisma from '@/lib/db';
import { WorkService } from './_components/work';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function Work() {
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

  return (
    <>
      <WorkService services={services} />

      <div className="container mt-5">
        <h3 className="text-2xl drop-shadow-md">Trabajos destacados</h3>
      </div>
    </>
  );
}
