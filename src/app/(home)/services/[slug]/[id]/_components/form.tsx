'use client';

import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  date: z.string().min(1, 'La fecha es obligatoria'),
  home: z.enum(['casa', 'departamento', 'oficina'], {
    message: 'Seleccionar el tipo de domicilio',
  }),
  location: z.string().min(1, 'Ingresa la ubicación'),
  describe: z.string().min(1, 'La descripción es obligatoria'),
});

const home = [
  { label: 'seleccionar  tipo de domicilio', value: '' },
  { label: 'Casa', value: 'casa' },
  { label: 'Departamento', value: 'departamento' },
  { label: 'Oficina', value: 'oficina' },
];

export default function FormService() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    console.log('onSubmit');
  };

  return (
    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Tipo de Domicilio
        <Select options={home} error={errors.home} {...register('home')} />
      </label>

      <label>
        ¿Cúal es la ubicación?
        <Input {...register('location')} error={errors.location} type="text" />
      </label>

      <label>
        ¿Para que fecha necesitás el servicio?
        <Input {...register('date')} error={errors.date} type="date" />
      </label>

      <label className="col-span-2">
        Describe tu necesidad a detalle
        <Textarea {...register('describe')} error={errors.describe} />
      </label>

      <div>
        <Button type="submit">Solicitar</Button>
      </div>
    </form>
  );
}
