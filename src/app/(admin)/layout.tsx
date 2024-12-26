import { ActiveLink } from '@/components/active-link';
import { NavBar } from '@/components/nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />

      <main className="relative mt-[65px]">
        <div className="border-b bg-zinc-100 py-3">
          <nav className="container mx-auto flex items-center gap-3">
            {menu.map((item) => (
              <ActiveLink
                className="flex items-center gap-2 rounded-full bg-zinc-200 px-4 py-1"
                href={item.href}
                key={item.name}
              >
                {item.name}
              </ActiveLink>
            ))}
          </nav>
        </div>

        <section className="container mx-auto py-4">{children}</section>
      </main>
    </>
  );
}

const menu = [
  {
    name: 'Perfil',
    href: '/admin',
  },
  {
    name: 'Mis Servicios',
    href: '/service',
  },
  {
    name: 'Solicitudes',
    href: '/request',
  },
];
