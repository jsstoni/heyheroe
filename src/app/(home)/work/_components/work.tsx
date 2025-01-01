'use client';

import Button from '@/components/ui/button';
import { useState } from 'react';

interface SubService {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
  subServices: SubService[];
}

interface Props {
  services: Service[];
}

export function WorkService({ services }: Props) {
  const [filteredSubServices, setFilteredSubServices] = useState<SubService[]>(
    []
  );

  const handleServiceChange = (serviceId: number) => {
    const service = services.find((s) => s.id === serviceId);
    setFilteredSubServices(service?.subServices || []);
  };

  return (
    <div className="mb-4 rounded-md bg-gradient-to-b from-indigo-100 to-white p-14">
      <div className="mx-auto md:max-w-3xl">
        <h1 className="text-5xl drop-shadow-md">
          Explora miles de oportunidades laborales en tu área:
        </h1>

        <div className="my-5 flex items-center gap-4 rounded-full border bg-white px-8 py-4 shadow-lg">
          <select
            className="w-full rounded-md border bg-white px-5 py-2.5"
            id="services"
            onChange={(e) => handleServiceChange(Number(e.target.value))}
          >
            <option value="">-- Selecciona un servicio --</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>

          <select
            className="w-full rounded-md border bg-white px-5 py-2.5"
            id="subServices"
          >
            <option value="">-- Selecciona un subservicio --</option>
            {filteredSubServices.map((subService) => (
              <option key={subService.id} value={subService.id}>
                {subService.name}
              </option>
            ))}
          </select>

          <Button>Filtrar</Button>
        </div>
      </div>
    </div>
  );
}
