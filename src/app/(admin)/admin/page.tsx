import { Heading } from '@/components/heading';
import { auth } from '@/lib/auth';
import Form from './_components/form';

export default async function Admin() {
  const session = await auth();
  if (!session) return null;

  return (
    <>
      <Heading title="Perfil" />

      <div className="mt-4">
        <Form values={session} />
      </div>
    </>
  );
}
