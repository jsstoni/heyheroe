import { ActiveLink } from '@/components/active-link';
import { NavBar } from '@/components/nav';
import { auth } from '@/lib/auth';
import { FileText, User, Wallet } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <NavBar />

      <main className="relative mt-[64px]">
        <div className="border-b max-sm:px-4">
          <nav className="container mx-auto flex items-center font-medium">
            {menu.map((item) => (
              <ActiveLink
                className="flex items-center gap-2 px-4 py-3.5 first:pl-0 hover:text-accent"
                href={item.href}
                key={item.name}
              >
                {item.Icon}
                {item.name}
              </ActiveLink>
            ))}
          </nav>
        </div>

        <section className="container mx-auto py-6 max-sm:px-4">
          {children}
        </section>
      </main>
    </>
  );
}

const menu = [
  {
    name: 'Perfil',
    href: '/dashboard',
    Icon: <User className="size-5" />,
  },
  {
    name: 'Mis Solicitudes',
    href: '/dashboard/request',
    Icon: <FileText className="size-5" />,
  },
  {
    name: 'Finanzas',
    href: '/dashboard/finance',
    Icon: <Wallet className="size-5" />,
  },
];
