import { auth } from '@/lib/auth';
import Script from 'next/script';
import Form from './_components/form';

export default async function Admin() {
  const session = await auth();
  if (!session) return null;

  return (
    <>
      <h1 className="bg-zinc-100 p-4 text-xs">Admin</h1>
      <div className="p-5">
        <div className="mb-6 flex items-center justify-between rounded-xl bg-gradient-to-l from-orange-500 to-red-500 p-6 shadow-lg">
          <h3 className="text-4xl font-extralight text-white">
            Quiero ser un héroe
          </h3>
          <button
            data-tally-open="w2Odjp"
            data-tally-layout="modal"
            data-tally-align-left="1"
            data-tally-hide-title="1"
            data-tally-emoji-text="👋"
            data-tally-emoji-animation="wave"
            data-tally-auto-close="0"
            className="isolate rounded-md bg-white/20 px-6 py-2.5 text-white shadow-lg ring-1 ring-black/5 hover:underline"
          >
            ¡Vamos a verificar!
          </button>
        </div>

        <Form values={session} />
      </div>

      <Script async src="https://tally.so/widgets/embed.js"></Script>
    </>
  );
}
