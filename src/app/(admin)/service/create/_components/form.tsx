'use client';

import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createService } from '../../action';

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

export const schema = z.object({
  service: z
    .number({ message: 'Selecciona un servicio' })
    .min(1, 'Selecciona un servicio'),
  price: z
    .number({ message: 'Agrega un precio' })
    .min(1, 'El precio debe ser mayor o igual a 0'),
  experience: z.string(),
  description: z
    .string()
    .min(90, 'La descripción debe tener al menos 90 caracteres'),
});

export type FormValues = z.infer<typeof schema>;

const options = [
  { value: 'Recien empieza', label: 'Recien empiezo' },
  { value: '1 año', label: '1 año' },
  { value: '2 años', label: '2 años' },
  { value: '3 años', label: '3 años' },
  { value: 'Más de 5 años', label: 'Más de 5 años' },
];

export default function Form({ services }: Props) {
  const [filteredSubServices, setFilteredSubServices] = useState<SubService[]>(
    []
  );

  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleServiceChange = (serviceId: number) => {
    const service = services.find((s) => s.id === serviceId);
    setFilteredSubServices(service?.subServices || []);
  };

  const onSubmit = async (data: FormValues) => {
    const response = await createService(data);
    if (response && 'error' in response) {
      setError('root', { message: 'hubo un error' });
      return;
    }
    reset();
  };

  return (
    <form
      className="grid gap-4 md:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>
        Selecciona un servicio
        <Select
          options={[
            { label: 'Seleccionar', value: '' },
            ...services.map((service) => ({
              label: service.name,
              value: String(service.id),
            })),
          ]}
          onChange={(e) => handleServiceChange(Number(e.target.value))}
        />
      </label>

      <label>
        Selecciona un subservicio
        <Select
          options={[
            { label: 'Seleccionar subservcio', value: '' },
            ...filteredSubServices.map((subService) => ({
              label: subService.name,
              value: String(subService.id),
            })),
          ]}
          error={errors.service}
          {...register('service', { valueAsNumber: true })}
        />
      </label>

      <label>
        Precio / Hora
        <Input
          {...register('price', { valueAsNumber: true })}
          type="number"
          min="0"
          step="100"
          error={errors.price}
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
          {...register('description')}
          placeholder="Cuéntales a tus clientes lo que haces en más de 90 caracteres"
          className="h-32"
          error={errors.description}
        />
      </label>

      {errors.root && (
        <p className="col-span-2 text-red-500">{errors.root.message}</p>
      )}

      <Button
        className="col-span-2 w-[100px]"
        type="submit"
        disabled={isSubmitting}
      >
        Guardar
      </Button>
    </form>
  );
}
