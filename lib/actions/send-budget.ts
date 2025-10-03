'use server';

import prisma from '@/lib/prisma/db';
import { schemaBudget } from '@/lib/zod/schemas/budget';
import { ActionError, actionClient, authMiddleware } from './safe-action';

export const sendBudget = actionClient
  .use(authMiddleware)
  .metadata({ name: 'send-budget' })
  .schema(schemaBudget)
  .action(async ({ parsedInput: data, ctx: { user } }) => {
    const proposal = await prisma.proposal.findUnique({
      where: { id: data.id },
      select: { userId: true },
    });

    const details = JSON.stringify(data.details);

    if (!proposal || proposal.userId === user) {
      throw new ActionError('No puedes enviarte prosupuesto a ti mismo');
    }

    await prisma.budget.create({
      data: {
        userId: user,
        proposalId: data.id,
        details,
        budget: data.budget,
      },
    });

    return { success: 'Presupuesto enviado.' };
  });
