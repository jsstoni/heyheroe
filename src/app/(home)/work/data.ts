import prisma from '@/lib/db';
import 'server-only';

function getId(slug: string) {
  const match = slug.match(/tarea-(\d+)$/);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return null;
}

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

export async function getOffersById(slug: string) {
  const id = getId(slug);

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
