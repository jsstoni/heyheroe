import Button from '@/components/ui/button';
import { commune } from '@/constants/commune';
import { getIdFrom, relativeDate } from '@/lib/utils';
import FormBudget from '#/home/_components/form-budget';
import { getOffersById } from '#/home/work/data';
import { Briefcase, Calendar, MapPinned } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Offers({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = getIdFrom(slug);
  const offer = await getOffersById(id);

  if (!offer) {
    notFound();
  }

  const place = commune.find((c) => c.id === offer.commune);

  return (
    <div className="container mx-auto px-4 py-8 md:px-0">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <div className="mb-1 flex items-center gap-2 font-thin text-gray-500">
            <span className="bg-primary-50 text-primary-600 rounded-full border px-3 py-1 text-xs font-medium">
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
          <div className="mb-4 space-y-2 rounded-lg border p-4 shadow-sm">
            <span className="block text-xs font-thin text-gray-500">
              Solicitado por:
            </span>
            {offer.user.name} ({place?.name})
          </div>

          <FormBudget id={id} />

          <div className="border-primary-200 bg-primary-50/40 mt-5 space-y-2 rounded-lg border p-6 text-center shadow-sm">
            <strong className="block">¿Eres un profesional?</strong>
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
