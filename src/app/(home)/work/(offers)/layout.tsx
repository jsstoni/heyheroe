import { Footer } from '@/components/footer';

export default async function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-50">
      {children}

      <Footer />
    </section>
  );
}
