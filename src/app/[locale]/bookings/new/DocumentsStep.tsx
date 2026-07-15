import {Dispatch, SetStateAction} from "react";
import {BookingDraft} from "./BookingDraft";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Controller, UseFormReturn} from "react-hook-form";
import {Field, FieldError} from "@/components/ui/field";
import {useTranslations} from "next-intl";

export const DocumentsStep = ({
  draft,
  setDraft,
  onBack,
  onNext,
  documentForm,
}: {
  draft: BookingDraft;
  setDraft: Dispatch<SetStateAction<BookingDraft>>;
  onBack: (value: SetStateAction<number>) => void;
  onNext: (value: SetStateAction<number>) => void;
  documentForm: UseFormReturn<{
    licenseFront?: File | undefined;
    licenseBack?: File | undefined;
    idCard?: File | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, any, {
    licenseFront?: File | undefined;
    licenseBack?: File | undefined;
    idCard?: File | undefined;
  }>;
}) => {
  const t = useTranslations('cars');

  const handleContinue =
    documentForm.handleSubmit(
      (values) => {
        setDraft(prev => ({
          ...prev,
          driverDocuments: {
            ...prev.driverDocuments,
            licenseFront: values.licenseFront,
            licenseBack: values.licenseBack,
            idCard: values.idCard,
          },
        }));
        onNext(prev => prev + 1);
      }
    );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {t('driverDocuments')}
      </h2>
      <form className='space-y-6'>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
          <Controller
            control={documentForm.control}
            name="licenseFront"
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <DocumentUploader
                  label={t('driverLicenseFront')}
                  existingUrl={
                    draft.driverDocuments?.licenseFrontUrl
                  }
                  onFileSelected={(file) =>
                    field.onChange(file)
                  }
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={documentForm.control}
            name="licenseBack"
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <DocumentUploader
                  label={t('driverLicenseBack')}
                  existingUrl={
                    draft.driverDocuments?.licenseBackUrl
                  }
                  onFileSelected={(file) =>
                    field.onChange(file)
                  }
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={documentForm.control}
            name="idCard"
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <DocumentUploader
                  label={t("governmentID")}
                  existingUrl={
                    draft.driverDocuments?.idCardUrl
                  }
                  onFileSelected={(file) =>
                    field.onChange(file)
                  }
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() =>
              onBack(prev => prev - 1)
            }
          >
            {t('back')}
          </Button>

          <Button onClick={handleContinue} className="bg-k-primary text-white hover:bg-k-primary/90 hover:text-white cursor-pointer">
            {t('continue')}
          </Button>
        </div>
      </form>
    </div>
  );
};

function DocumentUploader({
  label,
  existingUrl,
  onFileSelected,
}: {
  label: string;
  existingUrl?: string;
  onFileSelected: (
    file: File
  ) => void;
}) {

  return (
    <div className="space-y-2 w-full max-w-sm">
      <Label>{label}</Label>

      {existingUrl && (
        <div className="w-full max-w-sm">
          <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
            <Image
              src={existingUrl}
              alt={label}
              fill
              sizes="100%"
              className="w-full rounded-lg object-cover "
            />
          </AspectRatio>
        </div>
      )}

      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file =
            e.target.files?.[0];

          if (!file) return;

          onFileSelected(file);
        }}
      />
    </div>
  );
}