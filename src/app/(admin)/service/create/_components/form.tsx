'use client';

import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

const schema = z.object({
  pricePerHour: z.number().min(0, 'El precio debe ser mayor o igual a 0'),
  experience: z.enum([
    'Recien empieza',
    '1 año',
    '2 años',
    '3 años',
    'Más de 5 años',
  ]),
  serviceDescription: z
    .string()
    .min(90, 'La descripción debe tener al menos 90 caracteres'),
});

type FormValues = z.infer<typeof schema>;

const options = [
  { value: 'Recien empieza', label: 'Recien empiezo' },
  { value: '1 año', label: '1 año' },
  { value: '2 años', label: '2 años' },
  { value: '3 años', label: '3 años' },
  { value: 'Más de 5 años', label: 'Más de 5 años' },
];

export default function Form({ services }: Props) {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [filteredSubServices, setFilteredSubServices] = useState<SubService[]>(
    []
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleServiceChange = (serviceId: number) => {
    setSelectedService(serviceId);

    const service = services.find((s) => s.id === serviceId);
    setFilteredSubServices(service?.subServices || []);
  };

  const onSubmit = (data: FormValues) => {
    console.log('onSubmit', data);
  };

  return (
    <form
      className="grid gap-4 md:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>
        Selecciona un servicio
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
      </label>

      <label>
        Selecciona un subservicio
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
      </label>

      <label>
        Precio / Hora
        <Input
          {...register('pricePerHour', { valueAsNumber: true })}
          type="number"
          min="0"
          step="0.01"
        />
      </label>

      <label>
        Años de experiencia
        <Select
          options={options}
          error={errors.experience}
          {...register('experience')}
        >
          <option value="Recien empiezo">Recién empiezo</option>
          <option value="1 año">1 año</option>
          <option value="2 años">2 años</option>
          <option value="3 años">3 años</option>
          <option value="mas de 5 años">Más de 5 años</option>
        </Select>
      </label>

      <label className="col-span-2 flex flex-col space-y-1">
        Describe ampliamente tu servicio
        <Textarea
          {...register('serviceDescription')}
          placeholder="Cuéntales a tus clientes lo que haces en más de 90 caracteres"
          className="h-32"
          error={errors.serviceDescription}
        />
      </label>

      <Button className="col-span-2 w-[100px]" type="submit">
        Guardar
      </Button>
    </form>
  );
}
