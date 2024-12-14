import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main className="w-full">
        <nav className="flex w-full items-center justify-between border-b p-5 shadow-[0_5px_3px_-2px_rgba(200,200,200,.2)]">
          <Link href="/" className="mx-auto">
            <img src="/logo.svg" alt="heyheroe" />
          </Link>
        </nav>

        <div className="grid grid-cols-[260px_1fr]">
          <aside>
            <nav className="flex flex-col gap-1"></nav>
          </aside>
          <div className="flex flex-col gap-5">
            <div className="bg-hero flex h-[360px] flex-col items-center justify-center bg-blue-500 bg-cover bg-center bg-no-repeat">
              <h1 className="text-6xl font-bold text-white">
                ¿Buscas algún servicio?
              </h1>
              <h2 className="text-4xl font-bold text-white">
                Encuentra las mejores ofertas
              </h2>
            </div>

            <h3 className="text-2xl font-bold text-zinc-500">
              Contrata a los mejores
            </h3>
          </div>
        </div>
      </main>
    </>
  );
}
