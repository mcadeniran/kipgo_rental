'use client';

import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {LoginFormSchema} from '@/schemas';

import {CardWrapper} from './CardWrapper';
import {useTranslations} from 'next-intl';
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from '../ui/button';
import useAuth from '@/context/AuthContext';
import {useState} from 'react';
import {Link} from '@/i18n/navigation';
import {FormError} from '../general/FormError';
import {FormSuccess} from '../general/FormSuccess';
import {Loader} from 'lucide-react';
import {EmailNotVerifiedError} from './auth-errors';
import {getFirebaseAuthError} from './firebase-auth-errors';
// import {useSearchParams} from 'next/navigation';

interface LoginFormProps {
  callbackUrl?: string;
}

export const LoginForm = ({
  callbackUrl,
}: LoginFormProps) => {
  const t = useTranslations();
  const a = useTranslations('auth');
  const schema = LoginFormSchema(t);

  const {login} = useAuth();

  // const searchParams = useSearchParams();

  // const callbackUrl = searchParams.get("callbackUrl");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });


  const onSubmit = async (values: z.infer<typeof schema>) => {
    const email = values.email;
    const password = values.password;
    setIsPending(true);
    setError('');
    setSuccess('');
    try {
      await login(email, password);
      // router.push("/admin");
    } catch (error) {
      if (error instanceof EmailNotVerifiedError) {
        setError("Please verify your email before logging in.");
        return;
      }

      setError(getFirebaseAuthError(error));
    }
    setIsPending(false);
  };

  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonLabel="Don't have an account?"
      backButtonHref={callbackUrl ? `/auth/register?callbackUrl=${encodeURIComponent(callbackUrl)}` : '/auth/register'}
      showSocials={false}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FieldGroup className="space-y-4">
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
                  disabled={isPending}
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
                  disabled={isPending}
                />
                <div className="flex w-full justify-end">
                  <Button variant='link' size='sm' className='px-0 font-normal'><Link href='/auth/reset'>Forgot password?</Link> </Button>
                </div>
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
            type='submit'
            size='lg'
            className='w-full bg-k-primary text-white hover:bg-k-primary/80 hover:text-white cursor-pointer'
            disabled={isPending}
          >
            {isPending ? <Loader className='animate-spin' /> : 'Login'}
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};
