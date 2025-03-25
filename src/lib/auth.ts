import { env } from '@/lib/env/server';
import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

const prisma = new PrismaClient();
export const auth = betterAuth({
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 15 * 60,
    },
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
  user: {
    additionalFields: {
      phone: {
        type: 'string',
        required: false,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    },
  },
});
