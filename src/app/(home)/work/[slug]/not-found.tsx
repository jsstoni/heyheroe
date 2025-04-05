import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container space-y-2 py-20 text-center">
      <h2 className="text-6xl font-medium">No encontrado</h2>
      <p className="text-lg text-gray-500">
        No se pudo encontrar el recurso solicitado
      </p>
      <Link
        className="mt-4 inline-block rounded-full bg-primary p-2 px-4 text-white hover:bg-accent"
        href="/"
      >
        Volver a la página principal
      </Link>
    </div>
  );
}
