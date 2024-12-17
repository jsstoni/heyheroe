import { NavBar } from '@/components/nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="container mx-auto mt-[65px] py-10">{children}</main>
    </>
  );
}
