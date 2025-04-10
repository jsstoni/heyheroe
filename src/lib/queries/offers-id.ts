import prisma from '@/lib/prisma/db';
import 'server-only';

export async function getOffersById(id: number | null) {
  if (!id) {
    return null;
  }

  const offer = await prisma.proposal.findUnique({
    include: {
      user: {
        select: {
          name: true,
        },
      },
      subServices: {
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
    omit: {
      userId: true,
      serviceId: true,
      address: true,
      type: true,
    },
    where: {
      id,
    },
  });

  return offer;
}
