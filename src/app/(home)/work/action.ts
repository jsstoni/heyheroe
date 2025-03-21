'use server';

import prisma from '@/lib/db';
import { actionClient, authMiddleware } from '@/lib/safe-action';
import { schemaBudget } from '#/home/work/validation';

export const sendBudget = actionClient
  .use(authMiddleware)
  .metadata({ name: 'send-budget' })
  .schema(schemaBudget)
  .action(async ({ parsedInput: data, ctx: { user } }) => {
    await prisma.budget.create({
      data: {
        userId: user,
        proposalId: data.id,
        budget: data.budget,
        description: data.description,
      },
    });

    return { success: 'Presupuesto enviado.' };
  });
