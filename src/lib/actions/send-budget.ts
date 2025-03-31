'use server';

import { actionClient, authMiddleware } from '@/lib/actions/safe-action';
import prisma from '@/lib/db';
import { schemaBudget } from '@/lib/zod/schemas/budget';

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
      },
    });

    return { success: 'Presupuesto enviado.' };
  });
