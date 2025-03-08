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
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.phoneNumber = token.phoneNumber as string;
      }
      return session;
    },
    authorized: ({ auth, request }) => {
      const isLoggedIn = !!auth?.user;
      const protected_routes = [
        '/admin',
        '/service',
        '/service/create',
        '/request',
        '/finance',
      ];
      const isOnDashboard = protected_routes.includes(request.nextUrl.pathname);
      return isLoggedIn || !isOnDashboard;
    },
  },
});
