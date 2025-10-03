export function Heading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div>
      <h1 className="font-medium text-2xl">{title}</h1>
      {sub && <h2 className="text-gray-400 text-sm">{sub}</h2>}
    </div>
  );
}
