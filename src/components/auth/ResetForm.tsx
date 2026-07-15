'use client';

import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Controller, useForm} from 'react-hook-form';
import {ResetPasswordFormSchema} from '@/schemas';

import {CardWrapper} from './CardWrapper';
import {useTranslations} from 'next-intl';
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from '../ui/button';
import useAuth from '@/context/AuthContext';
import {useEffect, useState} from 'react';
import {useRouter} from '@/i18n/navigation';
import PageLoader from '../general/PageLoader';
import {FormError} from '../general/FormError';
import {FormSuccess} from '../general/FormSuccess';
import {Loader} from 'lucide-react';

export const ResetForm = () => {
  const t = useTranslations();
  const a = useTranslations('auth');
  const schema = ResetPasswordFormSchema(t);

  const {currentUser, userDataObj, role, loading, login} = useAuth();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    }
  });


  useEffect(() => {
    if (loading) return;
    if (!currentUser || !role) return;

    switch (role) {
      case "admin":
        router.replace("/admin");
        break;

      case "rental":
        router.replace("/rentals");
        break;

      case "user":
        router.replace("/download");
        break;
    }
  }, [currentUser, role, loading, router]);

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
    const email = values.email;
    setIsPending(true);
    setError('');
    setSuccess('');
    try {
      // await login(email);
      // router.push("/admin");
    } catch {
      setError(a('invalidEmailorPassword'));
    }
    setIsPending(false);
  };

  return (
    <CardWrapper
      headerLabel={a('forgotYourPassword')}
      backButtonLabel={a('backToLogin')}
      backButtonHref='/auth/login'
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
                  {a('email')}
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
        </FieldGroup>
        <div className="space-y-4">
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type='submit'
            className='w-full bg-k-primary text-white hover:bg-k-primary/80 hover:text-white cursor-pointer'
          >
            {isPending ? <Loader className='animate-spin' /> : a('sendResetEmail')}
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};
