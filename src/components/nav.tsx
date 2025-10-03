import { ActiveLink } from './active-link';
import Profile from './profile';
import Link from 'next/link';

export const NavBar = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white">
      <nav className="container flex h-[64px] items-center justify-between gap-4 px-4 md:px-0">
        <Link className="flex items-end gap-1 font-black text-2xl" href="/">
          <img
            src="/logo.svg"
            width="25"
            height="25"
            alt="HeyHéroe"
            title="heyhéroe"
          />
          eyhéroe
        </Link>

        <ul className="mx-auto flex items-center justify-between gap-5 font-medium">
          <li>
            <ActiveLink className="hover:text-primary" href="/work">
              Ofertas de trabajo
            </ActiveLink>
          </li>
          <li>
            <ActiveLink className="hover:text-primary" href="/services">
              Servicios
            </ActiveLink>
          </li>
        </ul>

        <hr className="mx-2 h-6 w-[1px] bg-gray-300" />

        <Profile />
      </nav>
    </header>
  );
};
