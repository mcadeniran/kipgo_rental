"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {Loader} from "lucide-react";
import {toast} from "sonner";
import * as z from 'zod';
import {Button} from "@/components/ui/button";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {RatingSchema} from "@/schemas";
import {ratingDefaultValues} from "@/constants/rating";
import VehicleRatingSection from "./VehicleRatingSection";
import RentalRatingSection from "./RentalRatingSection";
import ReviewDetailsSection from "./ReviewDetailsSection";
import ProsConsInput from "./ProsConsInput";
import ReviewPhotoUpload from "./ReviewPhotoUpload";
import useSubmitRating from "@/lib/helper/useSubmitRating";
import {useTranslations} from "next-intl";

interface SubmitRatingFormProps {
  bookingId: string;
  onSuccess?: () => void;
}

export default function SubmitRatingForm({
  bookingId,
  onSuccess,
}: SubmitRatingFormProps) {
  const t = useTranslations('bookings');
  const m = useTranslations();
  const schema = RatingSchema(m);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: ratingDefaultValues,
    mode: "onSubmit",
  });

  const {
    mutateAsync,
    isPending,
    error,
    isError
  } = useSubmitRating();

  // const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      // setIsSubmitting(true);

      await mutateAsync({
        bookingId,
        rating: values,
      });

      toast.success(t('thankYouForYourReview'));

      onSuccess?.();

      form.reset(ratingDefaultValues);

    } catch (error) {
      console.error(error);

      toast.error(t('unableToSubmitYourReview'));
    } finally {
      // setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
    >
      {/* Vehicle */}

      <VehicleRatingSection
        control={form.control}
      />

      {/* Rental */}

      <RentalRatingSection
        control={form.control}
      />

      {/* Review */}

      <ReviewDetailsSection
        control={form.control}
      />

      {/* Pros */}

      <FieldGroup>

        <Controller
          control={form.control}
          name="details.pros"
          render={({field, fieldState}) => (
            <Field
              data-invalid={
                fieldState.invalid
              }
            >
              <FieldLabel>
                {t('whatDidYouLike')}
              </FieldLabel>

              <ProsConsInput
                title={t('pros')}
                placeholder={t('pressEnterAfter')}
                value={field.value}
                onChange={
                  field.onChange
                }
              />

              {fieldState.invalid && (
                <FieldError
                  errors={[
                    fieldState.error,
                  ]}
                />
              )}
            </Field>
          )}
        />

      </FieldGroup>

      {/* Cons */}

      <FieldGroup>

        <Controller
          control={form.control}
          name="details.cons"
          render={({field, fieldState}) => (
            <Field
              data-invalid={
                fieldState.invalid
              }
            >
              <FieldLabel>
                {t('whatCouldBeImproved')}
              </FieldLabel>

              <ProsConsInput
                title={t('cons')}
                placeholder={t('pressEnterAfter')}
                value={field.value}
                onChange={
                  field.onChange
                }
              />

              {fieldState.invalid && (
                <FieldError
                  errors={[
                    fieldState.error,
                  ]}
                />
              )}
            </Field>
          )}
        />

      </FieldGroup>

      {/* Photos */}

      <FieldGroup>

        <Controller
          control={form.control}
          name="details.photos"
          render={({field, fieldState}) => (
            <Field
              data-invalid={
                fieldState.invalid
              }
            >
              <FieldLabel>
                {t('reviewPhotos')}
              </FieldLabel>

              <ReviewPhotoUpload
                value={field.value}
                onChange={
                  field.onChange
                }
              />

              {fieldState.invalid && (
                <FieldError
                  errors={[
                    fieldState.error,
                  ]}
                />
              )}
            </Field>
          )}
        />

      </FieldGroup>

      {/* Submit */}

      <div className="sticky bottom-0 z-10 rounded-lg border bg-background/95 p-4 backdrop-blur supports-backdrop-filter:bg-background/60">
        {isError && (
          <p className="mb-4 text-sm text-destructive">
            {error instanceof Error
              ? error.message
              : t('unableToSubmitYourReview')}
          </p>
        )}

        <Button
          type="submit"
          disabled={
            isPending
          }
          className="w-full bg-k-primary text-white hover:bg-k-primary/90 hover:text-white"
        >
          {isPending ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />

              {t('submittingReview')}
            </>
          ) : (
            t('submitReview')
          )}
        </Button>
      </div>
    </form>
  );
}