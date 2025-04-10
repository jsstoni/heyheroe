'use server';

import prisma from '@/lib/prisma/db';

export const previewBudget = async (proposalId: number) => {
  try {
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      select: {
        subServices: {
          select: { name: true, service: { select: { name: true } } },
        },
        budget: { include: { user: { select: { name: true } } } },
      },
    });

    if (!proposal) {
      return null;
    }

    const serializedBudget = {
      ...proposal,
      budget: proposal.budget.map((item) => ({
        ...item,
        budget: Number(item.budget),
      })),
    };

    return serializedBudget;
  } catch (error) {
    console.error('Error previewing budget:', error);
    return null;
  }
};
