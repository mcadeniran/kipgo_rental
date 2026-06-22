import * as z from 'zod';
import { Translator } from './create-schema';

export const LoginFormSchema = (t: Translator) =>
  z.object({
    email: z
      .email(t('validation.emailInvalid'))
      .nonempty(t('validation.emailRequired')),
    password: z.string().min(1, t('validation.passwordRequired')),
  });

export const ResetPasswordFormSchema = (t: Translator) =>
  z.object({
    email: z
      .email(t('validation.emailInvalid'))
      .nonempty(t('validation.emailRequired')),
  });

export const RegisterFormSchema = (t: Translator) =>
  z.object({
    email: z
      .email(t('validation.emailInvalid'))
      .nonempty(t('validation.emailRequired')),
    password: z.string().min(8, 'Minimum 8 characters required'),
    username: z.string().min(1, 'Username is required'),
  });
