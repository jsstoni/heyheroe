'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { FormValues } from './create/_components/form';

export const createService = async (data: FormValues) => {
  const session = await auth();

  if (!session || !session.user?.id) {
    return { error: 'No estas autorizado' };
  }

  const { description, experience, price, service } = data;

  try {
    await prisma.professional.create({
      data: {
        userId: +session.user.id,
        serviceId: service,
        description,
        experience,
        price,
      },
    });
    revalidatePath('/service');
    return { success: 'servicio creado' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al crear el servicio' };
  }
};
