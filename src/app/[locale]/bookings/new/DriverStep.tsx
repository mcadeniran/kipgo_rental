import {Dispatch, SetStateAction} from "react";
import {BookingDraft} from "./BookingDraft";
import {Renter} from "../../models/Renter";
import {Controller, UseFormReturn} from "react-hook-form";
import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldTitle} from "@/components/ui/field";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Input} from "@/components/ui/input";
import {formatDobForInput} from "@/lib/helper/formatDobForInput";
import {useTranslations} from "next-intl";

export const DriverStep = ({
  drivers,
  setDraft,
  draft,
  onBack,
  onNext,
  driverForm,
}: {
  drivers: Renter[];
  setDraft: Dispatch<SetStateAction<BookingDraft>>;
  draft: BookingDraft;
  onBack: (value: SetStateAction<number>) => void;
  onNext: (value: SetStateAction<number>) => void;
  driverForm: UseFormReturn<{
    name: string;
    email: string;
    phone: string;
    dob: string;
    gender: "Male" | "Female" | "Others";
    selectedDriverId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, any, {
    name: string;
    email: string;
    phone: string;
    dob: string;
    gender: "Male" | "Female" | "Others";
    selectedDriverId?: string | undefined;
  }>;
}) => {
  const t = useTranslations('cars');

  function hasDriverChanged(
    values: {
      name: string;
      email: string;
      phone: string;
      dob: string;
      gender: "Male" | "Female" | "Others";
      selectedDriverId?: string | undefined;
    },
    original: Renter
  ) {
    return (
      values.name !== original.name ||
      values.email !== original.email ||
      values.phone !== original.phone ||
      values.dob !== formatDobForInput(original.dob) ||
      values.gender !== original.gender
    );
  }


  const handleContinue =
    driverForm.handleSubmit((values) => {

      const originalDriver =
        drivers.find(
          d => d.id === values.selectedDriverId
        );

      let action:
        | "existing"
        | "create"
        | "update";

      if (draft.driver?.mode === "new") {
        action = "create";
      }
      else if (
        originalDriver &&
        hasDriverChanged(values, originalDriver)
      ) {
        action = "update";
      }
      else {
        action = "existing";
      }

      setDraft((prev) => ({
        ...prev,
        driver: {
          ...prev.driver!,
          id: values.selectedDriverId,
          action,
          name: values.name,
          email: values.email,
          phone: values.phone,
          dob: values.dob,
          gender: values.gender
        }

      }));
      onNext((prev) => prev + 1);
    });

  return <div className="flex flex-col space-y-4">
    <form className='space-y-6'>
      <h2 className="text-xl font-semibold">
        {t('driversDetails')}
      </h2>

      {
        drivers.length > 0 && (
          <FieldGroup className="w-full">
            <Controller
              control={driverForm.control}
              name="selectedDriverId"
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-selectedDriver'>{t('savedDrivers')}</FieldLabel>
                  <RadioGroup
                    value={field.value ?? ""}


                    onValueChange={(value) => {

                      const driver =
                        drivers.find(
                          (d) => d.id === value
                        );

                      if (!driver) return;

                      field.onChange(value);

                      // driverForm.setValue("selectedDriverId", driver.id);
                      driverForm.setValue("name", driver.name);
                      driverForm.setValue("email", driver.email);
                      driverForm.setValue("phone", driver.phone);
                      driverForm.setValue("dob", formatDobForInput(driver.dob));
                      driverForm.setValue("gender", driver.gender as
                        | "Male"
                        | "Female"
                        | "Others"
                      );
                      setDraft((prev) => ({
                        ...prev,
                        driver: {
                          id: driver.id,

                          mode: "saved",

                          action: "existing",

                          name: driver.name,
                          email: driver.email,
                          phone: driver.phone,
                          dob: driver.dob,
                          gender: driver.gender,

                          licenseFront: driver.licenseFront,
                          licenseBack: driver.licenseBack,
                          idCard: driver.idCard
                        },

                        driverDocuments: {
                          licenseBackUrl: driver.licenseBack,
                          licenseFrontUrl: driver.licenseFront,
                          idCardUrl: driver.idCard
                        },

                      }));
                    }}
                    id="form-selectedDriver"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {
                        drivers.map(driver => (
                          <FieldLabel htmlFor={driver.id} key={driver.id}
                            className="block rounded-lg border border-border p-0 transition-all cursor-pointer has-[[data-slot=radio-group-item][data-checked]]:border-k-primary has-[[data-slot=radio-group-item][data-checked]]:bg-transparent has-[[data-slot=radio-group-item][data-checked]]:text-k-primary">
                            <Field orientation="horizontal">
                              <FieldContent>
                                <FieldTitle>{driver.name}</FieldTitle>
                                <FieldDescription>
                                  {driver.email}
                                </FieldDescription>
                              </FieldContent>
                              <RadioGroupItem value={driver.id} id={driver.id} />
                            </Field>
                          </FieldLabel>
                        ))
                      }
                    </div>
                  </RadioGroup>
                </Field>
              )}
            />
          </FieldGroup>
        )
      }

      <FieldGroup className="grid md:grid-cols-2 gap-4">
        <Controller
          control={driverForm.control}
          name="name"
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-name">
                {t('fullName')}
              </FieldLabel>
              <Input
                {...field}
                id="form-name"
                aria-invalid={fieldState.invalid}
                placeholder="John Doe"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={driverForm.control}
          name="email"
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-email">
                {t('email')}
              </FieldLabel>
              <Input
                {...field}
                id="form-email"
                aria-invalid={fieldState.invalid}
                placeholder="johndoe@mail.com"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={driverForm.control}
          name="phone"
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-phone">
                {t('phone')}
              </FieldLabel>
              <Input
                {...field}
                id="form-phone"
                aria-invalid={fieldState.invalid}
                placeholder="+905331234567"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={driverForm.control}
          name="dob"
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-dob">
                {t('dateOfBirth')}
              </FieldLabel>
              <Input
                {...field}
                id="form-dob"
                type="date"
                aria-invalid={fieldState.invalid}
                placeholder="01-01-2001"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <Controller
        name="gender"
        control={driverForm.control}
        render={({field, fieldState}) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{t('gender')}</FieldLabel>

            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex gap-4"
            >
              <FieldLabel htmlFor="male" className="block rounded-lg border border-border transition-all cursor-pointer has-[[data-slot=radio-group-item][data-checked]]:border-k-primary has-[[data-slot=radio-group-item][data-checked]]:bg-transparent has-[[data-slot=radio-group-item][data-checked]]:text-k-primary">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>{t('male')}</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value="Male"
                    id="male"
                  />
                </Field>
              </FieldLabel>

              <FieldLabel htmlFor="female" className="block rounded-lg border border-border transition-all cursor-pointer has-[[data-slot=radio-group-item][data-checked]]:border-k-primary has-[[data-slot=radio-group-item][data-checked]]:bg-transparent has-[[data-slot=radio-group-item][data-checked]]:text-k-primary">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>{t("female")}</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value="Female"
                    id="female"
                  />
                </Field>
              </FieldLabel>

              <FieldLabel htmlFor="others" className="block rounded-lg border border-border transition-all cursor-pointer has-[[data-slot=radio-group-item][data-checked]]:border-k-primary has-[[data-slot=radio-group-item][data-checked]]:bg-transparent has-[[data-slot=radio-group-item][data-checked]]:text-k-primary">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>{t("others")}</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value="Others"
                    id="others"
                  />
                </Field>
              </FieldLabel>
            </RadioGroup>

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />


      <Button
        type="button"
        variant="outline"
        onClick={() => {

          driverForm.reset({
            selectedDriverId: "",
            name: "",
            email: "",
            phone: "",
            dob: "",
            gender: "Male",
          });
          setDraft((prev) => ({
            ...prev,
            driver: {
              mode: "new",

              action: "create",

              name: "",
              email: "",
              phone: "",
              dob: "",
              gender: "Male",
              licenseFront: undefined,
              licenseBack: undefined,
              idCard: undefined,
            },
            driverDocuments: {
              licenseBackUrl: undefined,
              licenseFrontUrl: undefined,
              idCardUrl: undefined
            },

          }));
        }}
      >
        <Plus /> {t('addNewDriver')}
      </Button>
      <div className="flex justify-between">

        <Button
          type="button"
          variant="outline"
          className='cursor-pointer'
          onClick={() =>
            onBack((prev) => prev - 1)
          }
        >
          {t('back')}
        </Button>

        <Button
          type="button"
          onClick={handleContinue}
          className="bg-k-primary text-white hover:bg-k-primary/90 hover:text-white cursor-pointer"
        >
          {t('continue')}
        </Button>
      </div>
    </form>
  </div>;
};