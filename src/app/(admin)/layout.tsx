import { ActiveLink } from '@/components/active-link';
import { NavBar } from '@/components/nav';
import { Clock, DollarSign, Send, User } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />

      <main className="relative mt-[72px]">
        <div className="border-b bg-gray-50 max-sm:px-4">
          <nav className="container mx-auto flex items-center">
            {menu.map((item) => (
              <ActiveLink
                className="flex items-center gap-2 px-4 py-3.5 first:pl-0 hover:text-amber-400"
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
    href: '/admin',
    Icon: <User className="size-4" />,
  },
  {
    name: 'Mis Servicios',
    href: '/service',
    Icon: <Clock className="size-4" />,
  },
  {
    name: 'Solicitudes',
    href: '/request',
    Icon: <Send className="size-4" />,
  },
  {
    name: 'Finanzas',
    href: '/finance',
    Icon: <DollarSign className="size-4" />,
  },
];
