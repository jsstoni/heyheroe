import { auth } from '@/lib/auth';
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import { headers } from 'next/headers';
import { z } from 'zod';

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error('Action error:', e.message);

    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    });
  },
}).use(async ({ next, clientInput, metadata }) => {
  const result = await next({ ctx: {} });
  if (process.env.NODE_ENV === 'development') {
    console.log(`Input -> ${JSON.stringify(clientInput)}`);
    console.log(`Result -> ${JSON.stringify(result.data)}`);
    console.log(`Metadata -> ${JSON.stringify(metadata)}`);

    return result;
  }

  return result;
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user.id) throw new Error('Unauthorized');

  return next({
    ctx: {
      user: session.user.id,
    },
  });
});
