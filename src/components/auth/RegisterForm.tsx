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
import {useState, useTransition} from 'react';
import {useRouter} from '@/i18n/navigation';
import PageLoader from '../general/PageLoader';
import {FormError} from '../general/FormError';
import {FormSuccess} from '../general/FormSuccess';
import {Loader} from 'lucide-react';
import {registerAction} from '@/actions/register-action';

export const RegisterForm = () => {
  const t = useTranslations();
  const a = useTranslations('auth');
  const schema = RegisterFormSchema(t);

  const {currentUser, userDataObj, role, loading, signUp} = useAuth();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    }
  });

  if (loading) {
    return <div className="flex bg-k-foreground w-full h-screen items-center justify-center text-k-primary">
      <PageLoader />
    </div>; // show spinner while checking
  }

  // If logged in, we return null because redirect will happen.
  if (currentUser && userDataObj) {
    return null;
  }


  const onSubmit = async (values: z.infer<typeof schema>) => {
    setError("");
    setSuccess("");

    // startTransition(() => {
    //   registerAction(values, t).then((data) => {
    //     setError(data.error);
    //     setSuccess(data.succees);
    //   });
    // });
  };

  return (
    <CardWrapper
      headerLabel='Create an account'
      backButtonLabel="Already have an account?"
      backButtonHref='/auth/login'
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
            type='submit'
            className='w-full bg-k-primary text-white hover:bg-k-primary/80 hover:text-white cursor-pointer'
          >
            {isPending ? <Loader className='animate-spin' /> : 'Create Account'}
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};
