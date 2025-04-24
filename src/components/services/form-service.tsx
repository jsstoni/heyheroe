'use client';

import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { commune } from '@/constants/commune';
import { sendProposal } from '@/lib/actions/send-proposal';
import { useCharacterLimit } from '@/lib/hooks/use-character-limit';
import { ProposalValues, schemaProposal } from '@/lib/zod/schemas/proposal';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const home = [
  { label: 'seleccionar  tipo de domicilio', value: '' },
  { label: 'Casa', value: 'Casa' },
  { label: 'Departamento', value: 'Departamento' },
];

export default function FormService({ id: serviceId }: { id: number }) {
  const cities = commune
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((s) => s.active)
    .map((v) => ({ value: v.id, label: v.name }));

  const [step, setStep] = useState(1);

  const {
    handleSubmit,
    register,
    getValues,
    setError,
    reset,
    formState: { errors },
    watch,
    trigger,
  } = useForm<ProposalValues>({
    resolver: zodResolver(schemaProposal),
    defaultValues: { serviceId },
  });

  const { value, handleChange, rest } = useCharacterLimit({
    minLength: 80,
  });

  const { executeAsync, isExecuting } = useAction(sendProposal, {
    onSuccess({ data }) {
      toast.success(data?.success || 'Solicitud enviada');
      reset();
      setStep(3);
    },
    onError({ error }) {
      toast.error(error.serverError || 'Hubo un error, vuelve intentar');
      setError('root', { message: error.serverError });
    },
  });

  const nextStep = async () => {
    let valid = false;

    if (step === 1) {
      valid = await trigger(['type', 'commune', 'address', 'serviceDate']);
    }

    if (valid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const watchAllFields = watch();

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          !!watchAllFields.type &&
          !!watchAllFields.commune &&
          !!watchAllFields.address &&
          !!watchAllFields.serviceDate
        );
      default:
        return false;
    }
  };

  const onSubmit = async () => {
    await executeAsync(getValues());
  };

  return (
    <form
      className="grid grid-cols-2 gap-x-6 gap-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="hidden"
        {...register('serviceId', { valueAsNumber: true })}
      />

      {step === 1 && (
        <>
          <label className="relative col-span-2">
            ¿Para qué fecha lo necesitas?
            <Calendar className="pointer-events-none absolute top-9 left-3 size-4 text-gray-400" />
            <Input
              {...register('serviceDate')}
              className="pl-8"
              type="date"
              error={errors.serviceDate}
            />
          </label>

          <label>
            Tipo de propiedad
            <Select {...register('type')} options={home} error={errors.type} />
          </label>

          <label>
            Comuna
            <Select
              {...register('commune', { valueAsNumber: true })}
              options={[{ value: 0, label: 'Seleccionar comuna' }, ...cities]}
              error={errors.commune}
            />
          </label>
          <label className="col-span-2">
            ¿Cúal es la ubicación?
            <Textarea
              {...register('address')}
              error={errors.address}
              rows={2}
            />
          </label>
        </>
      )}

      {step === 2 && (
        <>
          <label className="col-span-2">
            Describe tu necesidad a detalle (Mínimo {rest} caracteres)
            <Textarea
              {...register('description')}
              error={errors.description}
              rows={4}
              value={value}
              onChange={handleChange}
            />
            <span className="col-span-2 text-xs text-gray-500">
              Incluye detalles como tamaño del espacio, materiales necesarios,
              requisitos específicos, etc.
            </span>
          </label>
        </>
      )}

      {step === 3 ? (
        <div className="col-span-2 text-center">
          <CheckCircle className="mx-auto size-16 stroke-primary" />
          <p className="mt-3 text-lg font-medium">¡Gracias por tu solicitud!</p>
          <p className="mx-auto max-w-sm text-sm">
            Pronto comenzarás a recibir propuestas personalizadas para el
            servicio que necesitas.
          </p>
          <button
            className="mx-auto mt-3 flex cursor-pointer items-center gap-2 hover:text-primary"
            type="button"
            onClick={() => setStep(1)}
          >
            <ArrowLeft className="size-4" /> Volver
          </button>
        </div>
      ) : (
        <div className="col-span-2 flex items-center gap-4">
          {step > 1 && (
            <Button type="button" onClick={prevStep}>
              Atras
            </Button>
          )}

          {step !== 2 && (
            <Button
              className="ml-auto"
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
            >
              Siguiente
            </Button>
          )}

          {step === 2 && (
            <Button
              className="ml-auto flex items-center justify-center gap-2 font-medium"
              variant="primary"
              type="submit"
            >
              {isExecuting ? 'Enviando ...' : 'Pedir presupuesto'}
              <ArrowRight size={18} color="white" />
            </Button>
          )}
        </div>
      )}

      {errors.root && (
        <p className="col-span-2 text-red-500">{errors.root.message}</p>
      )}
    </form>
  );
}
