import prisma from '@/lib/db';
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
    omit: {
      userId: true,
      serviceId: true,
      address: true,
      type: true,
    },
  });

  return data;
};

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
