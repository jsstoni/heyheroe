import prisma from '@/lib/prisma/db';
import { unstable_cache } from 'next/cache';
import 'server-only';

//my proposal
export const getRequests = (userId: string) =>
  unstable_cache(
    async () => {
      const requests = await prisma.proposal.findMany({
        include: {
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
          _count: {
            select: {
              budget: true,
            },
          },
        },
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      return requests;
    },
    [`services-${userId}`],
    { revalidate: 3600, tags: ['requests'] }
  )();
