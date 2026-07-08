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





type FormValues =
  z.infer<
    typeof ProfileSchema
  >;

export default function PersonalInformationCard() {

  const {currentUser, userDataObj, refreshProfile} = useAuth();

  const mutation = useUpdateProfile();

  const form =
    useForm<FormValues>({
      resolver:
        zodResolver(
          ProfileSchema,
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

  async function onSubmit(values: FormValues) {
    if (!currentUser)
      return;

    try {
      await mutation.mutateAsync({
        uid: currentUser.uid,
        ...values,
      });
      await refreshProfile();
      form.reset(values);
      toast.success("Profile updated.");
    } catch {
      toast.error("Unable to update profile.");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Personal Information
        </CardTitle>
        <CardDescription>
          Update your personal details.
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
                    First Name
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
                    Last Name
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
                    Phone Number
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
            className="w-full"
          >
            {mutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}