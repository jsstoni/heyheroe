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
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [filteredSubServices, setFilteredSubServices] = useState<SubService[]>(
    []
  );

  const handleServiceChange = (serviceId: number) => {
    setSelectedService(serviceId);

    // Filtra los subservicios del servicio seleccionado
    const service = services.find((s) => s.id === serviceId);
    setFilteredSubServices(service?.subServices || []);
  };

  return (
    <div className="mb-4 rounded-md bg-blue-50 p-10">
      <h1 className="mx-auto max-w-xl text-3xl font-extrabold text-zinc-500 drop-shadow-md">
        Explora miles de oportunidades laborales en tu área:
      </h1>

      <div className="mx-auto my-5 flex max-w-3xl items-center gap-4 rounded-full border bg-white px-8 py-4 shadow-lg">
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
  );
}
