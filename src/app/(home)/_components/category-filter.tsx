'use client';

import servicesData from '~/data/services.json';
import { Loader2 } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useTransition } from 'react';
import { filtersParams } from '../work/searchParams';

export default function CategoryFilter() {
  const [isLoading, startTransition] = useTransition();

  const [category, setCategory] = useQueryState(
    'category',
    filtersParams.category.withOptions({
      startTransition,
      shallow: false,
    })
  );

  const selectedCategories = category ?? [];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    const newCategories = isChecked
      ? [...selectedCategories, value]
      : selectedCategories.filter((c) => c !== value);
    setCategory(newCategories);
  };

  return (
    <>
      {isLoading && (
        <Loader2 className="absolute top-5 right-5 size-6 animate-spin" />
      )}
      <span className="mb-1 block text-sm text-gray-400">Categorías</span>
      <ul className="flex flex-col gap-1">
        {servicesData
          .filter((s) => s.active)
          .map((service) => (
            <li key={service.id}>
              <label className="flex items-center gap-2 select-none">
                <input
                  className="size-5"
                  type="checkbox"
                  value={service.slug}
                  checked={selectedCategories.includes(service.slug)}
                  onChange={handleChange}
                />{' '}
                <span>{service.name}</span>
              </label>
            </li>
          ))}
      </ul>
    </>
  );
}
