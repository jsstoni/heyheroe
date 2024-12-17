export default function Home() {
  return (
    <>
      <div className="flex h-[360px] flex-col items-center justify-center bg-blue-600 bg-hero bg-cover bg-center bg-no-repeat">
        <div className="max-w-2xl text-center">
          <h1 className="text-6xl font-bold text-white drop-shadow-md">
            ¿Buscas algún servicio?
          </h1>
          <h2 className="mt-1 text-2xl font-bold text-white drop-shadow-md">
            Explora servicios confiables y de calidad.
          </h2>
        </div>
      </div>

      <div className="px-10">
        <h3 className="text-2xl font-bold text-zinc-500">
          Contrata a los mejores
        </h3>
      </div>
    </>
  );
}
