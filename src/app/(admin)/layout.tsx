import { ActiveLink } from '@/components/active-link';
import { NavBar } from '@/components/nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />

      <main className="container relative mx-auto h-[calc(100vh-65px)] border-x">
        <aside className="absolute inset-y-0 flex w-[260px] flex-col gap-4 border-r bg-white">
          <nav className="flex flex-col">
            {menu.map((item) => (
              <ActiveLink
                className="flex items-center gap-2 px-4 py-2.5 hover:bg-zinc-200 hover:text-orange-500"
                href={item.href}
                key={item.name}
              >
                <img src={item.icon} alt={item.name} className="size-6" />
                {item.name}
              </ActiveLink>
            ))}
          </nav>
        </aside>

        <section className="mt-[65px] md:ml-[260px]">{children}</section>
      </main>
    </>
  );
}

const menu = [
  {
    name: 'Perfil',
    href: '/admin',
    icon: '/svgs/icon-entrenador.svg',
  },
  {
    name: 'Mis Servicios',
    href: '/service',
    icon: '/svgs/icon-servicio.svg',
  },
];
