import { Heading } from '@/components/heading';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { headers } from 'next/headers';
import Link from 'next/link';
import { cache } from 'react';

export const dynamic = 'force-dynamic';

const getData = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || !session.user.id) return [];

  try {
    const services = prisma.professional.findMany({
      where: {
        userId: session.user.id,
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
            className="flex items-start rounded-md border p-4"
            key={service.id}
          >
            <div className="flex flex-col">
              <h3 className="text-xl font-medium text-gray-600">
                {service.service.service.name}
              </h3>
              <h4 className="text-sm text-gray-400">{service.service.name}</h4>
            </div>
            <span className="ml-auto text-xs font-medium text-green-600">
              ${service.price}/hora
            </span>
          </div>
        ))}
        <Link
          className="flex flex-col justify-center rounded-md border-2 border-dashed p-2 text-center hover:border-amber-500"
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
