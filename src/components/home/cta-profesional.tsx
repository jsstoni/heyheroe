import Link from 'next/link';

export default function ProfesionalCTA() {
  return (
    <section className="container mx-auto my-16 px-4 md:px-0">
      <div className="bg-primary/20 flex rounded-lg p-10 pb-0 text-balance shadow-inner">
        <div>
          <h3 className="text-primary-foreground mb-4 text-2xl font-black md:text-4xl">
            ¿Eres un profesional?
          </h3>
          <h4 className="mx-auto mb-8 max-w-2xl">
            Únete a nuestra plataforma y comienza a ofrecer tus servicios a
            miles de clientes potenciales. Aumenta tus ingresos y expande tu
            negocio.
          </h4>

          <Link
            href="#"
            className="border-primary hover:text-accent text-primary rounded-lg border bg-white px-6 py-2 font-medium"
          >
            Saber más
          </Link>
        </div>
        <img
          src="/hero.png"
          alt="Hero Image"
          className="mx-auto -mt-30 max-w-md"
        />
      </div>
    </section>
  );
}
