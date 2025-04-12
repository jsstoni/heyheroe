import { z } from 'zod';

export const schemaProposal = z.object({
  serviceId: z.number().min(1, 'Se requiere el ID del servicio'),
  type: z.enum(['Casa', 'Departamento'], {
    message: 'Seleccionar el tipo de domicilio',
  }),
  address: z.string().min(1, 'Ingresa la ubicación'),
  commune: z.number().min(1, 'Ingresa la comuna'),
  serviceDate: z.coerce
    .date({ message: 'La fecha es obligatoria' })
    .refine((date) => date > new Date(), {
      message: 'Selecciona una fecha posterior a hoy',
    }),
  description: z.string().min(80, 'Se requieren mínimo 80 caracteres'),
});

export type ProposalValues = z.infer<typeof schemaProposal>;
