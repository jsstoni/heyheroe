'use server';

import {
  actionClient,
  ActionError,
  authMiddleware,
} from '@/lib/actions/safe-action';
import prisma from '@/lib/db';
import { schemaBudget } from '@/lib/zod/schemas/budget';

export const sendBudget = actionClient
  .use(authMiddleware)
  .metadata({ name: 'send-budget' })
  .schema(schemaBudget)
  .action(async ({ parsedInput: data, ctx: { user } }) => {
    const proposal = await prisma.proposal.findUnique({
      where: { id: data.id },
      select: { userId: true },
    });

    if (!proposal || proposal.userId === user) {
      throw new ActionError('No puedes enviarte prosupuesto a ti mismo');
    }

    await prisma.budget.create({
      data: {
        userId: user,
        proposalId: data.id,
        budget: data.budget,
      },
    });

    return { success: 'Presupuesto enviado.' };
  });
