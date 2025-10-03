import AsideBudget from '@/components/dashboard/aside-budget';
import { PreviewBudget } from '@/components/dashboard/preview-budget';
import { Heading } from '@/components/heading';
import { getCommuneById } from '@/constants/commune';
import { auth } from '@/lib/auth';
import { getRequests } from '@/lib/queries/requests';
import { relativeDate } from '@/lib/utils';
import { Calendar, File, MapPin, Users } from 'lucide-react';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

const getMyRequests = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user.id) {
    return [];
  }

  const resquests = await getRequests(session.user.id);

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
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      {resquests.map((service) => (
        <div
          className="self-start rounded-lg border bg-white p-4 text-gray-400 shadow-xs"
          key={service.id}
        >
          <h3 className="font-medium text-gray-800 text-xl">
            {service.subServices.service.name} - {service.subServices.name}
          </h3>
          <p className="flex items-center gap-2 text-sm">
            <Calendar className="size-3" />
            {relativeDate(service.createdAt)}
          </p>

          <p className="mt-2 flex items-center gap-1">
            <MapPin className="size-3" /> {getCommuneById(service.commune)} -{' '}
            {service.address}
          </p>

          <div className="mt-3 flex items-center gap-1 border-t pt-1">
            <Users className="size-4" />
            {service._count.budget}

            <PreviewBudget id={service.id} />
          </div>
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

      <AsideBudget />
    </>
  );
}
