import Link from 'next/link';
import Profile from './profile';

export const NavBar = () => {
  return (
    <div className="fixed top-0 z-50 w-full border-b bg-white shadow-[0_5px_3px_-2px_rgba(200,200,200,.2)]">
      <nav className="container flex h-[65px] items-center justify-between gap-4 max-sm:px-4">
        <Link className="text-2xl font-extrabold" href="/">
          HeyHéroe
        </Link>

        <ul className="mx-auto flex items-center justify-between gap-6">
          <li>
            <Link className="hover:text-orange-500" href="/work">
              Buscar trabajos
            </Link>
          </li>
          <li>
            <Link className="hover:text-orange-500" href="/services">
              Servicios
            </Link>
          </li>
        </ul>

        <Profile />
      </nav>
    </div>
  );
};
