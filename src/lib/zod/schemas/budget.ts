import { z } from 'zod';

export const schemaBudget = z.object({
  id: z.number().min(1, 'Está faltando el id'),
  budget: z.coerce.number().min(1, 'Ingresa un presupuesto'),
});

export type BudgetValues = z.infer<typeof schemaBudget>;
