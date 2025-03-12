import { Heading } from '@/components/heading';
import Form from './_components/form';

export default async function Admin() {
  return (
    <>
      <Heading title="Perfil" sub="Administra tu información personal" />

      <div className="mt-4">
        <Form />
      </div>
    </>
  );
}
