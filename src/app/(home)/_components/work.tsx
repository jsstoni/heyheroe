import SearchService from '@/components/search';
import Button from '@/components/ui/button';
import { Search } from 'lucide-react';

export function WorkService() {
  return (
    <div className="bg-gray-100 px-4 md:p-14">
      <div className="mx-auto md:max-w-3xl">
        <h1 className="mb-6 text-center text-3xl font-black md:text-4xl lg:text-5xl">
          Explora miles de oportunidades laborales en tu área:
        </h1>

        <div className="grid grid-cols-3 items-center gap-4 rounded-xl border bg-white p-4 shadow-lg">
          <div className="relative col-span-2 rounded-lg border">
            <Search className="pointer-events-none absolute top-3.5 left-3 z-10 h-5 w-5 text-gray-400" />
            <SearchService />
          </div>

          <Button className="py-3" variant="primary">
            Buscar trabajo
          </Button>
        </div>
      </div>
    </div>
  );
}
