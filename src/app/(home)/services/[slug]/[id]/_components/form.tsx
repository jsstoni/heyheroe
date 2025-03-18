'use client';

import { sendProposal } from '@/app/(home)/services/action';
import {
  ProposalValues,
  schemaProposal,
} from '@/app/(home)/services/validation';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { commune } from '@/contants/commune';
import { useCharacterLimit } from '@/hooks/use-character-limit';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Calendar, DollarSign, TriangleAlert } from 'lucide-react';
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
      setStep(1);
    },
    onError({ error }) {
      toast.error(error.serverError || 'Hubo un error, vuelve intentar');
      setError('root', { message: error.serverError });
    },
  });

  const nextStep = async () => {
    let valid = false;

    if (step === 1) {
      valid = await trigger(['type', 'commune', 'address']);
    } else if (step === 2) {
      valid = await trigger(['serviceDate', 'budget']);
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
          !!watchAllFields.address
        );
      case 2:
        return !!watchAllFields.serviceDate && !!watchAllFields.budget;
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
      {step === 1 && (
        <>
          <label>
            Tipo de domicilio
            <Select options={home} error={errors.type} {...register('type')} />
          </label>

          <label>
            Comuna
            <Select
              options={[{ value: '', label: 'Seleccionar comuna' }, ...cities]}
              error={errors.commune}
              {...register('commune')}
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
          <label className="relative col-span-2">
            ¿Para qué fecha lo necesitas?
            <Calendar className="pointer-events-none absolute top-9 left-3 size-4 text-gray-400" />
            <Input
              {...register('serviceDate')}
              error={errors.serviceDate}
              type="date"
              className="pl-8"
            />
          </label>

          <label className="relative col-span-2">
            Presupuesto estimado
            <DollarSign className="pointer-events-none absolute top-9 left-3 size-4 text-gray-400" />
            <Input
              className="pl-8"
              {...register('budget')}
              error={errors.budget}
              type="number"
            />
          </label>

          <p className="bg-primary-50 text-primary-500 col-span-2 flex items-center gap-2 rounded-lg p-2 text-xs font-medium">
            <TriangleAlert className="stroke-primary-500 size-4" /> Un
            presupuesto demasiado bajo puede dificultar encontrar profesionales.
          </p>
        </>
      )}

      {step === 3 && (
        <>
          <label className="col-span-2">
            Describe tu necesidad a detalle ({rest})
            <Textarea
              rows={4}
              error={errors.description}
              {...register('description')}
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

      <div className="col-span-2 flex items-center gap-4">
        {step > 1 && (
          <Button type="button" onClick={prevStep}>
            Atras
          </Button>
        )}

        {step !== 3 && (
          <Button
            className="ml-auto"
            type="button"
            onClick={nextStep}
            disabled={!isStepValid()}
          >
            Siguiente
          </Button>
        )}

        {step === 3 && (
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

      {errors.root && (
        <p className="col-span-2 text-red-500">{errors.root.message}</p>
      )}
    </form>
  );
}
