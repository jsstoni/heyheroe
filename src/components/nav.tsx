import Link from 'next/link';
import Profile from './profile';

export const NavBar = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b-2 bg-white">
      <nav className="container flex h-[70px] items-center justify-between gap-4 px-4 md:px-0">
        <Link className="text-2xl font-black" href="/">
          Hey
          <span className="text-amber-400">Héroe</span>
        </Link>

        <ul className="ml-auto flex items-center justify-between gap-5 font-medium">
          <li>
            <Link className="hover:text-amber-500" href="/work">
              Ofertas de trabajo
            </Link>
          </li>
          <li>
            <Link className="hover:text-amber-500" href="/services">
              Servicios
            </Link>
          </li>
        </ul>

        <hr className="mx-2 h-6 w-[1px] bg-gray-300" />

        <Profile />
      </nav>
    </header>
  );
};
