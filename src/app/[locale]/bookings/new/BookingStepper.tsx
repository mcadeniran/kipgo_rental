import {cn} from "@/lib/utils";

export function BookingStepper({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: string[];
}) {
  return (
    <div className="flex items-center justify-between">

      {steps.map(
        (step, index) => (
          <div
            key={step}
            className="flex items-center flex-1"
          >
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center border",

                index <= currentStep
                  ? "bg-k-primary text-white"
                  : "bg-background"
              )}
            >
              {index + 1}
            </div>

            <span className="ml-2 hidden md:block">
              {step}
            </span>

            {index <
              steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-3",
                    index <
                      currentStep
                      ? "bg-k-primary"
                      : "bg-muted"
                  )}
                />
              )}
          </div>
        )
      )}
    </div>
  );
}