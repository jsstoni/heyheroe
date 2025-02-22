import { ActiveLink } from '@/components/active-link';
import { NavBar } from '@/components/nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />

      <main className="relative mt-[65px]">
        <div className="bg-gray-100 py-3 max-sm:px-4">
          <nav className="container mx-auto flex items-center gap-3">
            {menu.map((item) => (
              <ActiveLink
                className="flex items-center gap-2 rounded-full bg-gray-200 px-4 py-1"
                href={item.href}
                key={item.name}
              >
                {item.name}
              </ActiveLink>
            ))}
          </nav>
        </div>

        <section className="container mx-auto py-4 max-sm:px-4">
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
