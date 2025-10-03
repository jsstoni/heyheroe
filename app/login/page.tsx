'use client';

import Button from '@/components/ui/button';
import { signIn } from '@/lib/auth-client';
import { UserCircle } from 'lucide-react';

export default function Login() {
  const googleSignIn = async () => {
    await signIn.social({ provider: 'google' });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 font-extrabold text-3xl">Iniciar sesión</h2>
          <p className="mt-1 text-gray-600 text-sm">
            Utiliza tu cuenta de Google para acceder
          </p>
        </div>
        <UserCircle className="mx-auto size-34" />
        <Button
          className="group relative w-full overflow-hidden"
          type="submit"
          variant="secondary"
          onClick={googleSignIn}
        >
          <small className="absolute inset-0 w-3 bg-primary transition-all duration-300 group-hover:w-full" />
          <span className="relative z-10">Iniciar con Google</span>
        </Button>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Después de iniciar sesión, podrás completar tu perfil de usuario.
        </p>
      </div>
    </div>
  );
}
