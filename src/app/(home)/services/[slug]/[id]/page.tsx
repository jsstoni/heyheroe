import { Accordion } from '@/components/accordion';
import { Footer } from '@/components/footer';
import items from '@/constants/faq-client';
import prisma from '@/lib/db';
import { Clock, DollarSign } from 'lucide-react';
import FormService from './_components/form';

interface PropsParams {
  params: Promise<{ id: number }>;
}

export const dynamic = 'force-static';

const getData = async (id: number) => {
  try {
    const serviceId = Number(id);
    if (isNaN(serviceId)) {
      throw new Error('ID es inválido');
    }

    const data = await prisma.subServices.findUnique({
      select: {
        name: true,
        service: {
          select: {
            name: true,
          },
        },
      },
      where: { id: serviceId },
    });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function generateStaticParams() {
  const subServices = await prisma.subServices.findMany({
    where: { active: true, service: { active: true } },
    select: {
      id: true,
      service: { select: { slug: true } },
    },
  });

  return subServices.map((subService) => ({
    slug: subService.service.slug,
    id: subService.id.toString(),
  }));
}

export default async function Sub({ params }: PropsParams) {
  const { id } = await params;
  const data = await getData(id);

  if (!data) {
    return <h1>Sub service not found</h1>;
  }

  return (
    <>
      <div className="bg-gray-50 py-14 max-sm:px-4">
        <div className="relative container mx-auto grid items-start gap-8 md:grid-cols-2">
          <div className="md:mt-4">
            <h1 className="mb-1 text-4xl font-bold">{data.service.name}</h1>
            <h2 className="mb-6 text-2xl">{data.name}</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-purple-300/40 p-2">
                  <Clock className="size-7 stroke-purple-700" />
                </div>
                <div>
                  <h4 className="font-medium">Ahorra tiempo</h4>
                  <p className="text-sm text-gray-600">
                    Deja que profesionales se encarguen mientras te enfocas en
                    lo importante
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-300/40 p-2">
                  <DollarSign className="size-7 stroke-green-700" />
                </div>
                <div>
                  <h4 className="font-medium">Precios competitivos</h4>
                  <p className="text-sm text-gray-600">
                    Compara presupuestos y elige la mejor opción para tu
                    bolsillo
                  </p>
                </div>
              </div>

              <h3 className="mt-10 text-xl font-medium underline">
                Preguntas frecuentes
              </h3>
              <Accordion items={items} defaultOpen={0} />
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-lg">
            <p className="text-2xl font-medium">Solicitar Presupuesto</p>
            <p className="mb-6 text-gray-400">
              Por favor complete la información para procesar su solicitud
            </p>

            <FormService id={id} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
