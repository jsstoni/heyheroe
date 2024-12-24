'use client';

import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from '../ui/textarea';

const schema = z.object({
  date: z.string().min(1, 'La fecha es obligatoria'),
  describe: z.string().min(1, 'La descripción es obligatoria'),
});

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
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="date">¿Para que fecha necesitás el servicio?</label>
      <Input {...register('date')} error={errors.date} id="date" type="date" />

      <label htmlFor="describe">Describile tu necesidad a detalle</label>
      <Textarea
        {...register('describe')}
        error={errors.describe}
        id="describe"
      />

      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
