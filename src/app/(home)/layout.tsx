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
      <nav className="flex w-full items-center justify-between border-b p-5 shadow-[0_5px_3px_-2px_rgba(200,200,200,.2)]">
        <Link href="/" className="mx-auto">
          <img src="/logo.svg" alt="heyheroe" />
        </Link>
      </nav>

      <div className="grid grid-cols-[260px_1fr]">
        <aside className="h-[calc(100vh-76px)] overflow-auto border-r">
          <nav className="flex flex-col gap-1">
            {services.map((service) => (
              <Link
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
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex flex-col gap-5">{children}</div>
      </div>
    </main>
  );
}
