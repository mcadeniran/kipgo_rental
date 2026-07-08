import {Rating} from "@/types/ratings";
import ReviewPreviewCard from "./ReviewPreviewCard";

interface ReviewPreviewListProps {
  reviews: Rating[];
  onReadMore?: (review: Rating) => void;
}

export default function ReviewPreviewList({
  reviews,
  onReadMore,
}: ReviewPreviewListProps) {
  return (
    <div className="flex gap-4 overflow-x-auto px-1 py-1 snap-x snap-mandatory">
      {reviews.map((review) => (
        <ReviewPreviewCard
          key={review.id}
          review={review}
          onReadMore={() => onReadMore?.(review)}
        />
      ))}
    </div>
  );
}