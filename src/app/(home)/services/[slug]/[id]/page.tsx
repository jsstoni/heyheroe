import { Accordion } from '@/components/accordion';
import { Footer } from '@/components/footer';
import FormService from '@/components/services/form-service';
import items from '@/constants/faq-client';
import prisma from '@/lib/prisma/db';
import { Clock, DollarSign } from 'lucide-react';
import { Metadata } from 'next';

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
        description: true,
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

export async function generateMetadata({
  params,
}: PropsParams): Promise<Metadata> {
  const { id } = await params;
  const data = await getData(id);
  if (!data) {
    return {
      title: 'Servicio no encontrado',
      description: 'El servicio solicitado no está disponible.',
    };
  }

  return {
    title: data.name,
    description: data.description,
  };
}

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
            <h1 className="mb-2 text-4xl font-bold">{data.service.name}</h1>
            <h2 className="text-2xl">{data.name}</h2>

            <div className="my-10 space-y-4">
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
            </div>
            <h3 className="text-xl font-medium underline">
              Preguntas frecuentes
            </h3>
            <Accordion items={items} defaultOpen={0} />
          </div>

          <div className="rounded-xl border bg-white shadow-lg">
            <div className="rounded-t-xl bg-primary p-6 text-white">
              <p className="text-2xl font-bold">Solicitar Presupuesto</p>
              <p>
                Por favor complete la información para procesar su solicitud
              </p>
            </div>

            <div className="p-6">
              <FormService id={id} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
