'use client';

import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendBudget } from '@/lib/actions/send-budget';
import { BudgetValues, schemaBudget } from '@/lib/zod/schemas/budget';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function FormBudget({ id }: { id: number | null }) {
  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    register,
    getValues,
    setValue,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm<BudgetValues>({
    resolver: zodResolver(schemaBudget),
    defaultValues: { id: id || undefined, details: [] },
  });

  const detailsAmount = watch('details');

  const detailsAmountTotal = detailsAmount.reduce(
    (acc, curr) => acc + Number(curr.amount || 0),
    0
  );

  useEffect(() => {
    setValue('budget', detailsAmountTotal);
  }, [detailsAmountTotal, setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details',
  });

  const { executeAsync, isExecuting } = useAction(sendBudget, {
    onSuccess({ data }) {
      toast.success(data?.success || 'Presupuesto enviado');
      reset({ id: id || undefined, details: [], budget: 0 });
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
          className="mt-2 flex flex-col gap-2 rounded-lg border p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Button
            className="mr-auto items-start p-1 px-3 text-sm"
            type="button"
            variant="secondary"
            onClick={() => append({ amount: 0, description: '' })}
          >
            Agregar detalle
          </Button>
          {fields.map((field, index) => (
            <div className="flex items-start gap-2" key={field.id}>
              <div>
                <Input
                  placeholder="Descripción"
                  error={errors.details?.[index]?.description?.message}
                  {...register(`details.${index}.description`)}
                />
              </div>
              <div>
                <Input
                  {...register(`details.${index}.amount`, {
                    valueAsNumber: true,
                  })}
                  type="number"
                  error={errors.details?.[index]?.amount?.message}
                />
              </div>
              <button type="button" onClick={() => remove(index)}>
                x
              </button>
            </div>
          ))}
          {errors.details && (
            <p className="col-span-2 text-red-500">{errors.details.message}</p>
          )}

          <label className="block">
            Valor del servicio
            <div className="flex items-center">
              <Input
                {...register('budget', { valueAsNumber: true })}
                className="rounded-none rounded-l-xl"
                type="number"
                placeholder="$0"
                readOnly
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
