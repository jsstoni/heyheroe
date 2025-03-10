export function Heading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div>
      <h1 className="text-2xl font-medium">{title}</h1>
      {sub && <h2 className="text-sm text-gray-400">{sub}</h2>}
    </div>
  );
}
