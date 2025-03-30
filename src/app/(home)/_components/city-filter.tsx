'use client';

import { commune } from '@/constants/commune';
import { useQueryState } from 'nuqs';
import { filtersParams } from '../work/searchParams';

export default function CityFilter() {
  const [city, setCity] = useQueryState(
    'commune',
    filtersParams.commune.withOptions({
      shallow: false,
    })
  );

  return (
    <>
      <span className="mb-1 block text-sm text-gray-400">Comuna</span>

      <ul className="flex flex-col gap-1">
        {commune
          .filter((c) => c.active)
          .map((c) => (
            <li key={c.id}>
              <label className="flex items-center gap-2 select-none">
                <input
                  className="size-5"
                  name="city"
                  type="radio"
                  value={c.id}
                  checked={city === c.id}
                  onChange={() => setCity(c.id)}
                />{' '}
                {c.name}
              </label>
            </li>
          ))}
      </ul>
    </>
  );
}
