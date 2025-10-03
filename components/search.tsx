'use client';

import { Input } from '@/components/ui/input';
import service from '@/constants/services.json';
import subService from '@/constants/sub-services.json';
import type { Service, SubService } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';

export default function SearchService() {
  const services = service as Service[];
  const subServices = subService as SubService[];

  const servicesActive = services
    .filter((ser) => ser.active)
    .map((ser) => {
      const relatedSubServices = subServices.filter(
        (sub) => sub.idService === ser.id && sub.active
      );

      return { ...ser, subServices: relatedSubServices };
    });

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredItems = servicesActive
    .map((item) => {
      const filteredSubs = item.subServices.filter((sub) =>
        sub.name.toLowerCase().includes(query.toLowerCase())
      );
      const matchesMainService = item.name
        .toLowerCase()
        .includes(query.toLowerCase());

      if (matchesMainService || filteredSubs.length > 0) {
        return {
          ...item,
          subServices: filteredSubs,
        };
      }

      return null;
    })
    .filter(Boolean);

  return (
    <div ref={inputRef} className="relative">
      <Input
        className="border-none bg-white py-6 pl-10 focus:outline-0"
        onClick={() => setOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="¿Que servicio necesitas?"
      />

      {open && (
        <div className="absolute z-10 mt-2 max-h-[140px] w-full overflow-auto bg-white p-4 shadow">
          {filteredItems.length > 0 ? (
            <ul>
              {filteredItems.map((item) => {
                if (!item) return null;
                const { id, name, subServices } = item;
                return (
                  <li className="font-black" key={id}>
                    {name}
                    {subServices.length > 0 && (
                      <ul className="font-normal">
                        {subServices.map((sub) => (
                          <li key={sub.name}>{sub.name}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
              No se encontraron resultados.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
