import prisma from '@/lib/db';
import { cache } from 'react';
import Form from './_components/form';

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

export default async function Create() {
  const services = await getData();

  return (
    <>
      <div className="p-5">
        <Form services={services} />
      </div>
    </>
  );
}
