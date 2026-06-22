'use server';

import * as z from 'zod';

import { RegisterFormSchema } from '@/schemas';
import { Translator } from '@/schemas/create-schema';

export const registerAction = async (
  values: z.infer<typeof RegisterFormSchema>,
  t: Translator,
) => {
  const schemas = RegisterFormSchema(t);

  const validatedFields = schemas.safeParse(schemas);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  return { succees: 'Email sent' };
};
