import { ActiveLink } from '@/components/active-link';
import prisma from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-static';
export const revalidate = 60;

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const services = await prisma.services.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return (
    <main>
      <nav className="fixed top-0 z-50 flex h-[65px] w-full items-center justify-between border-b bg-white p-4 shadow-[0_5px_3px_-2px_rgba(200,200,200,.2)]">
        <Link className="text-3xl font-extrabold text-orange-500" href="/">
          HeyHeroe
        </Link>

        <ul className="flex items-center justify-between gap-6">
          <li>
            <Link href="#">Buscar trabajos</Link>
          </li>
          <li>
            <Link href="#">Como funciona</Link>
          </li>
          <li>
            <Link href="#">Garantia</Link>
          </li>
        </ul>

        <Link
          className="rounded-full border border-orange-500 px-6 py-1.5 hover:bg-orange-500 hover:text-white"
          href="#"
        >
          Empezar ahora
        </Link>
      </nav>

      <div className="mt-[65px]">
        <aside className="fixed bottom-0 top-[65px] w-[260px] overflow-hidden border-r bg-white hover:overflow-auto">
          <nav className="flex flex-col gap-1">
            {services.map((service) => (
              <ActiveLink
                key={service.id}
                href={`/services/${service.slug}`}
                className="flex items-center gap-2 p-2.5 px-5 text-zinc-500 transition-colors hover:text-orange-500"
              >
                <img
                  className="size-5"
                  src={`/svgs/${service.icon}.svg`}
                  alt={service.name}
                />
                {service.name}
              </ActiveLink>
            ))}
          </nav>
        </aside>

        <div className="ml-[260px] flex flex-col gap-5 pb-10">{children}</div>
      </div>
    </main>
  );
}
