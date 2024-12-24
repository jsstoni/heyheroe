import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { DefaultSession } from 'next-auth';
import Google from 'next-auth/providers/google';
import prisma from './db';

declare module 'next-auth' {
  interface Session {
    user: {
      phoneNumber?: string;
    } & DefaultSession['user'];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = !!auth?.user;
      const protected_routes = ['/admin'];
      const isOnDashboard = protected_routes.includes(request.nextUrl.pathname);
      return isLoggedIn || !isOnDashboard;
    },
  },
});
