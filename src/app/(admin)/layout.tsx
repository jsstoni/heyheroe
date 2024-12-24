import { ActiveLink } from '@/components/active-link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <aside className="fixed inset-y-0 flex w-[260px] flex-col gap-4 border-r bg-white py-5">
        <h1 className="text-center text-3xl font-extrabold text-orange-500">
          HeyHeroe
        </h1>

        <nav className="flex flex-col gap-1">
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

      <main className="md:ml-[260px]">{children}</main>
    </>
  );
}

const menu = [
  {
    name: 'Perfil',
    href: '/admin',
    icon: '/svgs/icon-entrenador.svg',
  },
];
