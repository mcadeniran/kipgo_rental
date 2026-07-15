'use client';

import * as z from "zod";
import {useEffect} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {Loader2, Save} from "lucide-react";

import {Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";

import {Input} from "@/components/ui/input";

import {Button} from "@/components/ui/button";

import useAuth from "@/context/AuthContext";
import {ProfileSchema} from "@/schemas";
import {useUpdateProfile} from "@/lib/helper/useUpdateProfile";
import {toast} from "sonner";
import {Field, FieldError, FieldGroup, FieldLabel} from "../ui/field";
import {useTranslations} from "next-intl";

export default function PersonalInformationCard() {
  const t = useTranslations();
  const m = useTranslations('profile');

  const schema = ProfileSchema(t);

  const {currentUser, userDataObj, refreshProfile} = useAuth();

  const mutation = useUpdateProfile();

  const form =
    useForm<z.infer<typeof schema>>({
      resolver:
        zodResolver(
          schema,
        ),

      defaultValues: {
        firstName: "",
        lastName: "",
        phone: "",
      },
    });

  useEffect(() => {
    if (!userDataObj) return;
    form.reset({
      firstName: userDataObj.personal.firstName,
      lastName: userDataObj.personal.lastName,
      phone: userDataObj.personal.phone,
    });
  }, [userDataObj, form]);

  async function onSubmit(values: z.infer<typeof schema>) {
    if (!currentUser)
      return;

    try {
      await mutation.mutateAsync({
        uid: currentUser.uid,
        ...values,
      });
      await refreshProfile();
      form.reset(values);
      toast.success(m('profileUpdated'));
    } catch {
      toast.error(m('unableToUpdateProfile'));
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {m('personalInformation')}
        </CardTitle>
        <CardDescription>
          {m('updateYourPersonalDetails')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup className="space-y-5">
            <Controller
              name="firstName"
              control={form.control}
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="firstName">
                    {m('firstName')}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="firstName"
                    aria-invalid={fieldState.invalid}
                    placeholder="John"
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
              name="lastName"
              control={form.control}
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="lastName">
                    {m('lastName')}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="lastName"
                    aria-invalid={fieldState.invalid}
                    placeholder="Doe"
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
              name="phone"
              control={form.control}
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">
                    {m('phoneNumber')}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="+905331234567"
                    autoComplete="off"
                    type="tel"
                    disabled={mutation.isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            disabled={!form.formState.isDirty || mutation.isPending}
            className="w-full bg-k-primary text-white hover:bg-k-primary/90 hover:text-white cursor-pointer"
          >
            {mutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {m('saveChanges')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}