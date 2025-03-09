import { Heading } from '@/components/heading';
import Form from './_components/form';

export default async function Admin() {
  return (
    <>
      <Heading title="Perfil" />

      <div className="mt-4">
        <Form />
      </div>
    </>
  );
}
