import 'server-only';
import prisma from '@/lib/prisma/db';
import { unstable_cache } from 'next/cache';

export const getOffersById = (id: number | null) =>
  unstable_cache(
    async () => {
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
    },
    [`getOffersById-${id}`],
    {
      revalidate: 3600,
      tags: ['offers-id'],
    }
  )();
