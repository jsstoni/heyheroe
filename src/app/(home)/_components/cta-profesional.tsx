import Link from 'next/link';

export default function ProfesionalCTA() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h3 className="mb-4 text-2xl font-black md:text-4xl">
          ¿Eres un profesional?
        </h3>
        <h4 className="mx-auto mb-8 max-w-2xl text-gray-600">
          Únete a nuestra plataforma y comienza a ofrecer tus servicios a miles
          de clientes potenciales. Aumenta tus ingresos y expande tu negocio.
        </h4>

        <Link
          href="#"
          className="border-primary-500 hover:text-primary-700 text-primary-500 rounded-lg border bg-white px-6 py-3 font-medium"
        >
          Saber más
        </Link>
      </div>
    </section>
  );
}
