'use client';

import * as z from 'zod';
import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {DeleteAccountSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader, Trash2, TriangleAlert} from "lucide-react";
import {useTranslations} from "next-intl";
import {Controller, useForm} from "react-hook-form";
import {Checkbox} from '@/components/ui/checkbox';
import {useDeleteAccount} from '@/lib/helper/useDeleteAccount';
import useAuth from '@/context/AuthContext';
import {useEffect} from 'react';

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  userEmail: string;
}

export default function DeleteAccountDialog({
  open,
  onOpenChange,
  userEmail
}: Props) {
  // const {currentUser} = useAuth();
  const t = useTranslations();
  const a = useTranslations('auth');
  const m = useTranslations('profile');
  const schema = DeleteAccountSchema(t);

  const mutation = useDeleteAccount();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: userEmail,
      password: "",
      accepted: false,
      confirmation: ""
    }
  });

  useEffect(() => {
    if (!open) return;

    form.reset({
      email: userEmail,
      password: "",
      confirmation: "",
      accepted: false,
    });
  }, [open, userEmail, form]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    mutation.mutate(values);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <DialogHeader>
            <DialogTitle className='flex gap-2 text-destructive'> <TriangleAlert className="h-4 w-4" /> Warning</DialogTitle>
            <DialogDescription className='flex flex-col'>
              {m('whatWillBeDeleted')}
              <span className=" ml-8 space-y-1 list-disc">
                <li>{m('yourProfile')}</li>
                <li>{m('yourRentalBookings')}</li>
                <li>{m('yourReviews')}</li>
                <li>{m('yourNotifications')}</li>
                <li>{m('yourUploadedFiles')}</li>
              </span>
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="space-y-2 my-2">
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
                    readOnly
                    aria-invalid={fieldState.invalid}
                    className="bg-muted"
                    tabIndex={-1}
                    placeholder="john.doe@email.com"
                    autoComplete="off"
                    disabled={mutation.isPending}
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
                    {a('password')}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-password"
                    type='password'
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    autoComplete="off"
                    disabled={mutation.isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmation"
              control={form.control}
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-delete'>
                    {m('typeDeleteToContinue')}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-delete"
                    type='text'
                    aria-invalid={fieldState.invalid}
                    placeholder={m('typeDelete')}
                    autoComplete="off"
                    disabled={mutation.isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='accepted'
              control={form.control}
              render={({field, fieldState}) => (
                <div>

                  <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                    <Checkbox id="terms-checkbox"
                      checked={field.value}
                      aria-invalid={fieldState.invalid}
                      onCheckedChange={
                        field.onChange
                      }
                      name="terms-checkbox"
                      disabled={mutation.isPending}
                    />
                    <FieldLabel htmlFor="terms-checkbox">{m('iUnderstandThisCannotBeUndone')}</FieldLabel>
                  </Field>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              )}
            />
          </FieldGroup>
          <DialogFooter className='flex flex-col gap-2'>
            <DialogClose render={<Button variant="outline" disabled={mutation.isPending}>{m('cancel')}</Button>} />
            <Button
              type="submit"
              variant="destructive"
              disabled={
                mutation.isPending ||
                !form.formState.isValid
              }
            >
              {mutation.isPending ? (
                <>
                  <Loader
                    className="mr-2 h-4 w-4 animate-spin"
                  />
                  {m('deletingAccount')}
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  {m('deleteAccount')}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
