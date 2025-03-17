import Button from '@/components/ui/button';
import { commune } from '@/contants/commune';
import { relativeDate } from '@/lib/utils';
import { Briefcase, Calendar, MapPinned } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getOffersById } from '../data';

export const dynamic = 'force-dynamic';

export default async function Offers({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offer = await getOffersById(slug);

  if (!offer) {
    notFound();
  }

  const place = commune.find((c) => c.id === offer.commune);

  return (
    <div className="container mx-auto px-4 py-8 md:px-0">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <div className="mb-1 flex items-center gap-2 text-gray-400">
            <span className="rounded-full border bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
              {offer.subServices.service.name}
            </span>
            <span className="flex items-center gap-2">
              • <Calendar className="size-4" /> Publicado{' '}
              {relativeDate(offer.createdAt)}
            </span>
            <span className="flex items-center gap-2">
              • <MapPinned className="size-4" /> {place?.name}
            </span>
          </div>

          <h3 className="mb-4 text-3xl font-black">{offer.subServices.name}</h3>

          <strong className="my-2 block text-lg">
            Descripción del servicio
          </strong>
          <p>{offer.description}</p>
        </div>

        <div className="col-span-2">
          <div className="space-y-2 rounded-lg border p-4 shadow-sm">
            Solicitado por: {offer.user.name} ({place?.name})
          </div>

          <div className="space-y-2 rounded-lg border p-4 shadow-sm">
            <strong>¿Eres un profesional?</strong>
            <p>
              Postúlate a este servicio y miles más. Crea tu perfil gratis y
              comienza a trabajar.
            </p>
            <Button className="flex w-full items-center justify-center gap-2">
              <Briefcase className="size-4" /> Postularme a este servicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
