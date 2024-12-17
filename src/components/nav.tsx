import Link from 'next/link';

export const NavBar = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-[65px] w-full items-center justify-between border-b bg-white p-4 shadow-[0_5px_3px_-2px_rgba(200,200,200,.2)]">
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
  );
};
