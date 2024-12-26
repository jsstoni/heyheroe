export function Heading({ title, sub }: { title: string; sub?: string }) {
  return (
    <>
      <h1 className="text-3xl">{title}</h1>
      {sub && <h2 className="text-zinc-400">{sub}</h2>}
    </>
  );
}
