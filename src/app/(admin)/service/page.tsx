import Link from 'next/link';

export default function Service() {
  return (
    <>
      <h1 className="bg-zinc-100 p-4 text-xs">Mis Servicios</h1>
      <div className="p-5">
        <Link
          className="rounded-md border border-orange-500 p-2 text-orange-500"
          href="/service/create"
        >
          Agregar servicio
        </Link>
      </div>
    </>
  );
}
