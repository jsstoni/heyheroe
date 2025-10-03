import FormBudget from '@/components/work/form-budget';
import { getCommuneById } from '@/constants/commune';
import { getOffersById } from '@/lib/queries/offers-id';
import { getIdFrom, relativeDate } from '@/lib/utils';
import { Briefcase, Calendar, MapPinned } from 'lucide-react';
import Link from 'next/link';
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

  return (
    <div className="container mx-auto px-4 py-8 md:px-0">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <div className="mb-4 flex items-center gap-2 font-thin text-gray-500">
            <span className="rounded-full border bg-muted px-3 py-1 font-medium text-accent text-xs">
              {offer.subServices.service.name}
            </span>
            <span className="flex items-center gap-2">
              • <Calendar className="size-4" /> Publicado{' '}
              {relativeDate(offer.createdAt)}
            </span>
            <span className="flex items-center gap-2">
              • <MapPinned className="size-4" /> {getCommuneById(offer.commune)}
            </span>
          </div>

          <h3 className="mb-4 font-black text-3xl">{offer.subServices.name}</h3>

          <strong className="my-2 block text-lg">
            Descripción del servicio
          </strong>
          <p>{offer.description}</p>
        </div>

        <div className="col-span-2">
          <div className="mb-4 space-y-2 rounded-lg border p-4 shadow-inner">
            <span className="block font-thin text-gray-500 text-xs">
              Solicitado por:
            </span>
            {offer.user.name} ({getCommuneById(offer.commune)})
          </div>

          <FormBudget id={id} />

          <div className="mt-5 space-y-2 rounded-lg border border-primary/40 bg-muted/30 p-6 text-center shadow-inner">
            <strong className="block">¿Eres un profesional?</strong>
            <p>
              Postúlate a este servicio y miles más. Crea tu perfil gratis y
              comienza a trabajar.
            </p>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLScx8OXvSgSOzNZvUU5f56RTMUnE-QH8XL_TB_fNaoYpkYxtXw/viewform?usp=header"
              target="_blank"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary p-2 text-primary hover:text-accent"
            >
              <Briefcase className="size-4" /> Postularme a este servicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
