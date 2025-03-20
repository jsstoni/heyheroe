import { Heading } from '@/components/heading';
import FormPerfil from '#/admin/_components/form-perfil';

export default async function Admin() {
  return (
    <>
      <Heading title="Perfil" sub="Administra tu información personal" />

      <div className="mt-4">
        <FormPerfil />
      </div>
    </>
  );
}
