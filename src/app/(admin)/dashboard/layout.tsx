import { ActiveLink } from '@/components/active-link';
import { NavBar } from '@/components/nav';
import { FileText, User, Wallet } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />

      <main className="relative mt-[70px]">
        <div className="border-b max-sm:px-4">
          <nav className="container mx-auto flex items-center font-medium">
            {menu.map((item) => (
              <ActiveLink
                className="hover:text-primary-400 flex items-center gap-2 px-4 py-3.5 first:pl-0"
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
