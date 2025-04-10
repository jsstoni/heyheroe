import prisma from '@/lib/prisma/db';
import 'server-only';

export const getOffers = async (
  category: string[] | null = null,
  commune: number | null = null
) => {
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
    where: {
      AND: [
        category && category.length > 0
          ? {
              subServices: {
                service: {
                  slug: { in: category },
                },
              },
            }
          : {},
        commune ? { commune } : {},
      ],
    },
    orderBy: { createdAt: 'desc' },
    omit: {
      userId: true,
      serviceId: true,
      address: true,
      type: true,
    },
  });

  return data;
};
