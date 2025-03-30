'use client';

import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendBudget } from '#/home/work/action';
import { BudgetValues, schemaBudget } from '#/home/work/validation';
import { Send } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function FormBudget({ id }: { id: number | null }) {
  const [open, setOpen] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm<BudgetValues>({
    resolver: zodResolver(schemaBudget),
    defaultValues: { id: id || undefined },
  });

  const { executeAsync, isExecuting } = useAction(sendBudget, {
    onSuccess({ data }) {
      toast.success(data?.success || 'Presupuesto enviado');
      reset();
    },
    onError({ error }) {
      toast.error(error.serverError || 'Hubo un error, vuelve intentar');
      setError('root', { message: error.serverError });
    },
  });

  const onSubmit = async () => {
    await executeAsync(getValues());
  };

  return (
    <>
      <Button className="w-full" onClick={() => setOpen((prev) => !prev)}>
        ¡Enviar Presupuesto!
      </Button>

      {open && (
        <form
          className="mt-2 space-y-2 rounded-lg border p-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="block">
            Valor del servicio
            <div className="flex items-center">
              <Input
                className="rounded-none rounded-l-xl"
                {...register('budget')}
                type="number"
                placeholder="$0"
              />
              <Button
                className="flex items-center gap-2 rounded-none rounded-r-xl"
                disabled={isExecuting}
                variant="primary"
              >
                <Send className="size-4" />
                {isExecuting ? 'Enviando ...' : 'Enviar'}
              </Button>
            </div>
          </label>
          {errors.budget && (
            <p className="col-span-2 text-red-500">{errors.budget.message}</p>
          )}

          {errors.root && (
            <p className="col-span-2 text-red-500">{errors.root.message}</p>
          )}
        </form>
      )}
    </>
  );
}
