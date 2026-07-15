'use client';

import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Controller, useForm} from 'react-hook-form';
import {RegisterFormSchema} from '@/schemas';

import {CardWrapper} from './CardWrapper';
import {useTranslations} from 'next-intl';
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from '../ui/button';
import useAuth from '@/context/AuthContext';
import {useState} from 'react';
import {FormError} from '../general/FormError';
import {FormSuccess} from '../general/FormSuccess';
import {Loader} from 'lucide-react';
import {getFirebaseAuthError} from './firebase-auth-errors';
import {Translator} from '@/schemas/create-schema';
// import {useSearchParams} from 'next/navigation';

interface LoginFormProps {
  callbackUrl?: string;
}

export const RegisterForm = ({
  callbackUrl,
}: LoginFormProps) => {
  const t: Translator = useTranslations();
  const schema = RegisterFormSchema(t);

  // const searchParams = useSearchParams();

  // const callbackUrl = searchParams.get("callbackUrl");

  const {loading, signUp} = useAuth();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");


  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    }
  });

  const onSubmit = async (
    values: z.infer<typeof schema>
  ) => {

    setError("");
    setSuccess("");

    try {
      await signUp(values.email, values.password, values.username);
      setSuccess(
        t('auth.weveSentAVerificationEmail')
      );
      form.reset();
    }
    catch (error) {
      setError(getFirebaseAuthError(error, t));
    }
  };

  return (
    <CardWrapper
      headerLabel={t('auth.createAnAccount')}
      backButtonLabel={t('auth.alreadyHaveAnAccount')}
      backButtonHref={callbackUrl ? `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : '/auth/login'}
      showSocials={false}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FieldGroup className="space-y-4">
          <Controller
            name="username"
            control={form.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-username">
                  {t('auth.username')}
                </FieldLabel>
                <Input
                  {...field}
                  id="form-username"
                  aria-invalid={fieldState.invalid}
                  placeholder="JDoe"
                  autoComplete="off"
                  disabled={loading}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-email">
                  {t('auth.email')}
                </FieldLabel>
                <Input
                  {...field}
                  id="form-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="john.doe@email.com"
                  autoComplete="off"
                  disabled={loading}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-password">
                  {t('auth.password')}
                </FieldLabel>
                <Input
                  {...field}
                  id="form-password"
                  type='password'
                  aria-invalid={fieldState.invalid}
                  placeholder="********"
                  autoComplete="off"
                  disabled={loading}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <div className="space-y-4">
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={loading}
            size='lg'
            type='submit'
            className='w-full bg-k-primary text-white hover:bg-k-primary/80 hover:text-white cursor-pointer'
          >
            {loading ? <Loader className='animate-spin' /> : t('auth.createAccount')}
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};