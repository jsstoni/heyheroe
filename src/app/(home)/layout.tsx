import { ActiveLink } from '@/components/active-link';
import { NavBar } from '@/components/nav';
import prisma from '@/lib/db';

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
    <>
      <NavBar />
      <main className="mt-[65px]">
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
      </main>
    </>
  );
}
