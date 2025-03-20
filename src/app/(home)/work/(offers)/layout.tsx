import { Footer } from '@/components/footer';
import prisma from '@/lib/db';
import { WorkService } from '#/home/_components/work';

const getData = async () => {
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
};

export default async function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const services = await getData();

  return (
    <>
      <WorkService services={services} />

      {children}

      <Footer />
    </>
  );
}
