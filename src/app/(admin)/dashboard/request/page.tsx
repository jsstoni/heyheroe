import { Heading } from '@/components/heading';
import { auth } from '@/lib/auth';
import { formatPrice, relativeDate } from '@/lib/utils';
import { getCachedRequests } from '#/admin/dashboard/request/data';
import { Calendar, File } from 'lucide-react';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

const getMyRequests = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user.id) {
    return [];
  }

  const resquests = await getCachedRequests(session.user.id);
  return resquests;
};

async function AsyncDataRequest() {
  const resquests = await getMyRequests();

  if (resquests.length < 1) {
    return (
      <div className="mt-5 flex flex-col items-center justify-center rounded-lg border border-dashed p-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <File className="size-10" />
        </div>
        <strong>No tienes solicitudes de servicios</strong>
        <p className="mx-auto max-w-md text-gray-500">
          Cuando solicites un servicio, podrás ver su estado y gestionar los
          detalles aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {resquests.map((service) => (
        <div
          className="rounded-lg border bg-white p-4 text-gray-400 shadow-sm"
          key={service.id}
        >
          <h3 className="text-xl font-medium text-gray-800">
            {service.subServices.service.name} - {service.subServices.name}
          </h3>
          <p className="flex items-center gap-2 text-sm">
            <Calendar className="size-3" />
            {relativeDate(service.createdAt)}
          </p>

          <p className="my-2">{service.description}</p>

          <span className="text-gray-800">
            {formatPrice(Number(service.budget))}
          </span>
        </div>
      ))}
    </div>
  );
}

export default async function Request() {
  return (
    <>
      <Heading
        title="Solicitudes de servicios"
        sub="Gestiona los servicios que has solicitado"
      />

      <AsyncDataRequest />
    </>
  );
}
