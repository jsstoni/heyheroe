import prisma from '@/lib/db';
import 'server-only';

export const getOffers = async () => {
  const data = await prisma.proposal.findMany({
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
  });

  return data;
};
