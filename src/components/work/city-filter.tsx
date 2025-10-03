'use client';

import { Select } from '@/components/ui/select';
import { commune } from '@/constants/commune';
import { filtersParams } from '@/lib/search-params/work';
import { useQueryState } from 'nuqs';

export default function CityFilter() {
  const [city, setCity] = useQueryState(
    'commune',
    filtersParams.commune.withOptions({
      shallow: false,
    })
  );

  const options = commune
    .filter((c) => c.active)
    .map((c) => ({
      value: c.id,
      label: c.name,
    }));

  return (
    <>
      <span className="mb-1 block text-gray-400 text-sm">Comuna</span>
      <Select
        options={[{ value: '', label: 'Todos' }, ...options]}
        value={city}
        onChange={(ev) => setCity(Number(ev.target.value))}
      />
    </>
  );
}
