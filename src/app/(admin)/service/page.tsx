import { Heading } from '@/components/heading';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import Link from 'next/link';
import { cache } from 'react';

const getData = cache(async () => {
  const session = await auth();
  if (!session || !session.user?.id) return [];

  try {
    const services = prisma.professional.findMany({
      where: {
        userId: +session.user.id,
      },
      include: {
        service: {
          select: {
            name: true,
            service: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return services;
  } catch (error) {
    console.log(error);
    return [];
  }
});

export default async function Service() {
  const services = await getData();

  return (
    <>
      <Heading title="Mis Servicios" sub="Administra tus servicios y precios" />

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <div
            className="flex items-start rounded-md border p-4 shadow-xs"
            key={service.id}
          >
            <div className="flex flex-col">
              <p className="text-xl">{service.service.service.name}</p>
              <p className="text-sm text-zinc-400">{service.service.name}</p>
            </div>
            <span className="ml-auto text-green-600">
              ${service.price}/hora
            </span>
          </div>
        ))}
        <Link
          className="flex flex-col justify-center rounded-md border-2 border-dashed p-2 text-center hover:border-orange-500"
          href="/service/create"
        >
          <strong>Agregar nuevo servicio</strong>
          <span className="block text-zinc-400">
            Añade un nuevo servicio a tu catálogo
          </span>
        </Link>
      </div>
    </>
  );
}
