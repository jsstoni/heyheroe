import { z } from 'zod';

export const schemaService = z.object({
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

export type ServiceValues = z.infer<typeof schemaService>;
