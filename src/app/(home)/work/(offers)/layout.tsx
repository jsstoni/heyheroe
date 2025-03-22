import { Footer } from '@/components/footer';
import { WorkService } from '#/home/_components/work';

export default async function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WorkService />

      {children}

      <Footer />
    </>
  );
}
