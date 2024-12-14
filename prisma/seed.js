import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  await prisma.services.createMany({
    data: [
      { id: 1, name: 'Cocina', slug: 'cocina', icon: 'icon-cocina' },
      {
        id: 2,
        name: 'Cuidado de personas',
        slug: 'cuidado-personas',
        icon: 'icon-cuidado-personas',
      },
      {
        id: 3,
        name: 'Cuidado de ropa',
        slug: 'cuidado-ropa',
        icon: 'icon-ropa',
      },
      {
        id: 4,
        name: 'Cuidado de vehículos',
        slug: 'cuidado-vehiculos',
        icon: 'icon-vehiculo',
      },
      {
        id: 5,
        name: 'Decoración',
        slug: 'decoracion',
        icon: 'icon-decorar',
      },
      {
        id: 6,
        name: 'Electrónica',
        slug: 'electronica',
        icon: 'icon-electronica',
      },
      { id: 7, name: 'Estética', slug: 'estetica', icon: 'icon-estetica' },
      {
        id: 8,
        name: 'Relajación',
        slug: 'relajacion',
        icon: 'icon-masajitas',
      },
      { id: 9, name: 'Eventos', slug: 'eventos', icon: 'icon-eventos' },
      {
        id: 10,
        name: 'Jardinería',
        slug: 'jardineria',
        icon: 'icon-jardinero',
      },
      { id: 11, name: 'Limpieza', slug: 'limpieza', icon: 'icon-limpieza' },
      { id: 12, name: 'Mascotas', slug: 'mascotas', icon: 'icon-mascotas' },
      {
        id: 13,
        name: 'Profesores',
        slug: 'profesores',
        icon: 'icon-educacion',
      },
      {
        id: 14,
        name: 'Entrenamiento',
        slug: 'entrenamiento',
        icon: 'icon-entrenador',
      },
      {
        id: 15,
        name: 'Reparaciones Caseras',
        slug: 'reparaciones-caseras',
        icon: 'icon-reparaciones',
      },
      {
        id: 17,
        name: 'Seguridad',
        slug: 'seguridad',
        icon: 'icon-seguridad',
      },
      {
        id: 19,
        name: 'Transporte \/ Fletes',
        slug: 'transporte-fletes',
        icon: 'icon-flete',
      },
      {
        id: 20,
        name: 'Servicio Integral',
        slug: 'servicio-integral',
        icon: 'icon-asistente',
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
