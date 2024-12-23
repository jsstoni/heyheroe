import prisma from '@/lib/db';
import { cache } from 'react';
import { WorkService } from './_components/work';

const getData = cache(async () => {
  'use server';
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
});

export default async function Work() {
  const services = await getData();

  return (
    <>
      <WorkService services={services} />

      <div className="container mt-5">
        <h3 className="text-2xl drop-shadow-md">Trabajos destacados</h3>
      </div>
    </>
  );
}
