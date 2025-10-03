import { NavBar } from '@/components/nav';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />

      <main className="mt-[64px]">{children}</main>
    </>
  );
}
