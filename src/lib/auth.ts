import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
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
