import { Footer } from '@/components/footer';

export default function Acercade() {
  return (
    <>
      <div className="container space-y-6 px-8 py-16 text-xl">
        <h1 className="mb-10 text-center text-4xl">¿Qué es HeyHéroe?</h1>

        <p>
          HeyHéroe es una plataforma creada por un programador independiente con
          un propósito claro:{' '}
          <strong>
            hacer más accesible y eficiente la búsqueda de profesionales
          </strong>{' '}
          , HeyHéroe conecta a personas con expertos que pueden solucionar sus
          necesidades con rapidez y calidad.
        </p>

        <p>
          <h3 className="text-3xl">💡 Misión:</h3> Formalizar el trabajo de
          profesionales independientes dedicados a tareas del hogar,
          ofreciéndoles un espacio profesional donde puedan demostrar sus
          habilidades, gestionar sus servicios y acceder a mejores oportunidades
          laborales. Nuestro objetivo es dignificar su trabajo, impulsando su
          crecimiento económico y visibilidad en el mercado.
        </p>

        <p>
          <h3 className="text-3xl">🎯 Visión:</h3> Convertirnos en la plataforma
          líder para la búsqueda de servicios en el hogar, donde cualquier
          persona pueda encontrar expertos de confianza de manera rápida,
          sencilla y segura, promoviendo un ecosistema inclusivo y eficiente
          donde la calidad y la accesibilidad sean prioridades.
        </p>
      </div>
      <Footer />
    </>
  );
}
