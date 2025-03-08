'use server';

import { schemaService } from '@/app/(admin)/service/validation';
import prisma from '@/lib/db';
import { authActionClient } from '@/lib/safe-action';
import { revalidatePath } from 'next/cache';

export const createService = authActionClient
  .metadata({ name: 'create-service' })
  .schema(schemaService)
  .action(
    async ({
      parsedInput: { description, experience, price, service },
      ctx: { user },
    }) => {
      try {
        await prisma.professional.create({
          data: {
            userId: user,
            serviceId: service,
            description,
            experience,
            price,
          },
        });
        revalidatePath('/service');
        return { success: 'servicio creado' };
      } catch (error) {
        console.error(error);
        throw new Error('Error al crear el servicio');
      }
    }
  );
