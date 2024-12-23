import Button from '@/components/ui/button';
import { signIn } from '@/lib/auth';

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Iniciar sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Usa tu cuenta de Google para acceder
          </p>
        </div>
        <form
          action={async () => {
            'use server';
            await signIn('google');
          }}
        >
          <Button className="w-full" type="submit" variant="secondary">
            Ingresa con Google
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Después de iniciar sesión, podrás completar tu perfil de usuario.
        </p>
      </div>
    </div>
  );
}
