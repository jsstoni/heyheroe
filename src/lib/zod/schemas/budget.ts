import { z } from 'zod';

export const schemaBudget = z.object({
  id: z.number().min(1, 'Está faltando el id'),
  budget: z.number().min(1, 'Ingresa un presupuesto'),
  details: z
    .array(
      z.object({
        description: z.string().min(1, 'Ingresa una descripción'),
        amount: z.number().min(1, 'Ingresa un monto'),
      })
    )
    .min(1, 'Por favor, agrega al menos un detalle'),
});

export type BudgetValues = z.infer<typeof schemaBudget>;
