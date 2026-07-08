import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Rating} from "@/types/ratings";
import ReviewHeader from "./ReviewHeader";

interface ReviewPreviewCardProps {
  review: Rating;
  onReadMore?: () => void;
  className?: string;
}

export default function ReviewPreviewCard({
  review,
  onReadMore,
  className,
}: ReviewPreviewCardProps) {
  return (
    <Card className={cn("min-w-[320px] max-w-85 snap-start", className)}>
      <CardContent className="space-y-3 p-4">

        <ReviewHeader
          rating={review.vehicle.overall}
          reviewer={review.createdBy.name}
          title={review.details.title}
          anonymous={review.details.isAnonymous}
          createdAt={review.createdAt}
        />

        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {review.details.review}
        </p>

        <Button
          variant="link"
          className="h-auto p-0"
          onClick={onReadMore}
        >
          Read full review
        </Button>

      </CardContent>
    </Card>
  );
}