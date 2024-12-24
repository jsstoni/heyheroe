'use client';

import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Complete el nombre'),
  email: z.string().email(),
  phone: z.string().min(1, 'Se require numero de teléfono'),
});

export default function Form({ values }: { values: Session }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: values.user.name,
      email: values.user.email,
      phone: values.user.phoneNumber,
    },
  });

  const onSubmit = () => {
    console.log('onSubmit');
  };

  return (
    <form
      className="grid gap-4 md:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>
        Nombre completo
        <Input
          {...register('name')}
          error={errors.name}
          id="name"
          type="text"
        />
      </label>

      <label>
        Correo electrónico
        <Input
          {...register('email')}
          error={errors.email}
          id="email"
          type="email"
          disabled
        />
      </label>

      <label>
        Teléfono
        <Input
          {...register('phone')}
          error={errors.phone}
          id="phone"
          placeholder="948977182"
          type="tel"
        />
      </label>

      <Button className="col-span-2 w-[100px]" type="submit">
        Guardar
      </Button>
    </form>
  );
}
