import { Star } from 'lucide-react';
import type { Review } from '../lib/mockData';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-lg border border-border bg-white p-6">
      <div className="flex items-start gap-4">
        <img
          src={review.studentAvatar}
          alt={review.studentName}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{review.studentName}</h4>
              <p className="text-sm text-muted-foreground">
                {new Date(review.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating ? 'fill-accent text-accent' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm text-foreground">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}
