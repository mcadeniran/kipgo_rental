"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {Loader} from "lucide-react";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {RatingFormValues, RatingSchema} from "@/schemas";
import {ratingDefaultValues} from "@/constants/rating";
import VehicleRatingSection from "./VehicleRatingSection";
import RentalRatingSection from "./RentalRatingSection";
import ReviewDetailsSection from "./ReviewDetailsSection";
import ProsConsInput from "./ProsConsInput";
import ReviewPhotoUpload from "./ReviewPhotoUpload";
import useSubmitRating from "@/lib/helper/useSubmitRating";

interface SubmitRatingFormProps {
  bookingId: string;
  onSuccess?: () => void;
}

export default function SubmitRatingForm({
  bookingId,
  onSuccess,
}: SubmitRatingFormProps) {
  const form = useForm<RatingFormValues>({
    resolver: zodResolver(RatingSchema),
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

  async function onSubmit(values: RatingFormValues) {
    try {
      // setIsSubmitting(true);

      await mutateAsync({
        bookingId,
        rating: values,
      });

      toast.success("Thank you for your review!");

      onSuccess?.();

      form.reset(ratingDefaultValues);

    } catch (error) {
      console.error(error);

      toast.error("Unable to submit your review.");
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
                What did you like?
              </FieldLabel>

              <ProsConsInput
                title="Pros"
                placeholder="Press Enter after each item..."
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
                What could be improved?
              </FieldLabel>

              <ProsConsInput
                title="Cons"
                placeholder="Press Enter after each item..."
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
                Review Photos
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
              : "Unable to submit your review."}
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

              Submitting Review...
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
      </div>
    </form>
  );
}