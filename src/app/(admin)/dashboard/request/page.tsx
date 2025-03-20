import { Heading } from '@/components/heading';
import { auth } from '@/lib/auth';
import { formatPrice, relativeDate } from '@/lib/utils';
import { myRequests } from '#/admin/dashboard/request/data';
import { Calendar } from 'lucide-react';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

const getMyRequests = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user.id) {
    return [];
  }

  const resquests = await myRequests(session.user.id);
  return resquests;
};

export default async function Request() {
  const resquests = await getMyRequests();

  return (
    <>
      <Heading
        title="Solicitudes de servicios"
        sub="Gestiona los servicios que has solicitado"
      />

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
    </>
  );
}
