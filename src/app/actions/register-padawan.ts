'use server'

import { PrismaPadawanRepository } from '@/infrastructure/db/repositories/prisma-padawan-repository';
import { ConsoleEventDispatcher } from '@/infrastructure/services/event-dispatcher';
import { RegisterPadawanUseCase } from '@/core/usecases/register-padawan';
import { padawanSchema } from '@/core/domain/validation/padawan-schema';
import { revalidatePath } from 'next/cache';

const padawanRepository = new PrismaPadawanRepository();
const eventDispatcher = new ConsoleEventDispatcher();
const registerPadawan = new RegisterPadawanUseCase(
  padawanRepository,
  eventDispatcher
);

export async function handlePadawanRegistration(formData: FormData) {
  try {
    const validatedData = padawanSchema.parse(Object.fromEntries(formData));
    const result = await registerPadawan.execute(validatedData);

    if (!result.isSuccess()) {
      return {
        success: false,
        message: result.getError()
      };
    }

    revalidatePath('/');
    return {
      success: true,
      message: "May the Force be with you, young Padawan! 🌟"
    };
  } catch (error) {
    return {
      success: false,
      message: "A disturbance in the Force has been detected... 🌀"
    };
  }
} 