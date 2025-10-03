import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const { signIn, signOut, useSession, updateUser } = createAuthClient({
  plugins: [inferAdditionalFields({ user: { phone: { type: 'string' } } })],
});
