import { z } from 'zod';

export const schemaBudget = z.object({
  id: z.number().min(1, 'está faltando el id'),
  budget: z.coerce.number().min(1, 'Ingresa un presupuesto'),
  description: z.string().min(1, 'Faltó el mensaje'),
});

export type BudgetValues = z.infer<typeof schemaBudget>;
