import { Heading } from '@/components/heading';
import prisma from '@/lib/db';
import { cache } from 'react';
import Form from './_components/form';

const getData = cache(async () => {
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
      <Heading
        title="Agregar nuevo servicio"
        sub="Complete los detalles del servicio que desea ofrecer."
      />

      <div className="mt-4">
        <Form services={services} />
      </div>
    </>
  );
}
