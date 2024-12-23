import Link from 'next/link';

export const NavBar = () => {
  return (
    <div className="fixed top-0 z-50 w-full border-b bg-white shadow-[0_5px_3px_-2px_rgba(200,200,200,.2)]">
      <nav className="container flex h-[65px] items-center justify-between">
        <Link className="text-3xl font-extrabold text-orange-500" href="/">
          HeyHeroe
        </Link>

        <ul className="flex items-center justify-between gap-6">
          <li>
            <Link href="/work">Buscar trabajos</Link>
          </li>
          <li>
            <Link href="#">Como funciona</Link>
          </li>
        </ul>

        <Link
          className="rounded-full border border-orange-500 px-4 py-1 text-orange-500 hover:bg-orange-500 hover:text-white"
          href="/login"
        >
          Empezar ahora
        </Link>
      </nav>
    </div>
  );
};
