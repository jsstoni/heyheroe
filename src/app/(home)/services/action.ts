'use server';

import { schemaProposal } from '@/app/(home)/services/validation';
import prisma from '@/lib/db';
import { actionClient, authMiddleware } from '@/lib/safe-action';

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
