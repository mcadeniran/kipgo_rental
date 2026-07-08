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
import {useSearchParams} from 'next/navigation';

export const RegisterForm = () => {
  const t = useTranslations();
  const a = useTranslations('auth');
  const schema = RegisterFormSchema(t);

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

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
        "We've sent a verification email. Please verify your email before logging in."
      );
      form.reset();
    }
    catch (error) {
      setError(getFirebaseAuthError(error));
    }
  };

  return (
    <CardWrapper
      headerLabel='Create an account'
      backButtonLabel="Already have an account?"
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
                  Username
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
                  Email
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
                  Password
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
            {loading ? <Loader className='animate-spin' /> : 'Create Account'}
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};