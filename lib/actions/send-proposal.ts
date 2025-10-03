'use server';

import { actionClient, authMiddleware } from '@/lib/actions/safe-action';
import prisma from '@/lib/prisma/db';
import { schemaProposal } from '@/lib/zod/schemas/proposal';

const sendProposal = actionClient
  .use(authMiddleware)
  .metadata({ name: 'send-proposal' })
  .schema(schemaProposal)
  .action(async ({ parsedInput: data, ctx: { user } }) => {
    await prisma.proposal.create({
      data: {
        userId: user,
        ...data,
        active: true,
      },
    });

    return { success: 'Gracias, se envió la solicitud del servicio' };
  });

export { sendProposal };
