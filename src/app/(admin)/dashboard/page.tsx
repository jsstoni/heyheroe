import FormPerfil from '@/app/(admin)/_components/form-perfil';
import { Heading } from '@/components/heading';

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
