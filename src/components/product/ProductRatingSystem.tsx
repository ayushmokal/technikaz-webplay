import { useState, useEffect } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

interface ProductRatingSystemProps {
  productId: string;
  productType?: 'mobile' | 'laptop';
}

export function ProductRatingSystem({ productId, productType = 'mobile' }: ProductRatingSystemProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const { toast } = useToast();

  const { data: ratingStats, refetch: refetchStats } = useQuery({
    queryKey: ['product-rating-stats', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('calculate_product_rating', { p_id: productId });

      if (error) throw error;
      return data?.[0] || { average_rating: 0, total_ratings: 0, rating_distribution: [0, 0, 0, 0, 0] };
    }
  });

  const { data: userReviews, refetch: refetchReviews } = useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    }
  });

  const handleRatingSubmit = async () => {
    if (!selectedRating) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    try {
      // First submit the rating
      const { error: ratingError } = await supabase
        .from('product_ratings')
        .insert({
          product_id: productId,
          rating: selectedRating,
        });

      if (ratingError) throw ratingError;

      // If there's a review text, submit the review
      if (review.trim()) {
        const { error: reviewError } = await supabase
          .from('product_reviews')
          .insert({
            product_id: productId,
            rating: selectedRating,
            review_text: review,
            user_name: "Anonymous" // Replace with actual user name when auth is implemented
          });

        if (reviewError) throw reviewError;
      }

      toast({
        title: "Success",
        description: "Thank you for your rating and review!",
      });

      setSelectedRating(0);
      setReview("");
      refetchStats();
      refetchReviews();
    } catch (error: any) {
      console.error('Error submitting rating:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit rating",
      });
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`transition-all duration-200 ${
              interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
            } ${
              star <= (interactive ? hoveredRating || selectedRating : rating)
                ? "text-yellow-400"
                : "text-gray-200"
            }`}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
            onClick={() => interactive && setSelectedRating(star)}
            disabled={!interactive}
          >
            <Star className="w-7 h-7" />
          </button>
        ))}
      </div>
    );
  };

  if (!ratingStats) return null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Rating Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-white rounded-xl shadow-md border border-gray-100">
        <div className="flex flex-col items-center justify-center space-y-3 p-4 bg-primary/5 rounded-lg">
          <div className="text-5xl font-bold text-primary">
            {ratingStats.average_rating}
          </div>
          <div className="mt-2">{renderStars(ratingStats.average_rating)}</div>
          <div className="text-sm text-gray-600 font-medium">
            Based on {ratingStats.total_ratings} ratings
          </div>
        </div>

        <div className="col-span-2 space-y-4 p-4">
          {[5, 4, 3, 2, 1].map((stars, index) => (
            <div key={stars} className="flex items-center gap-4">
              <span className="w-16 text-sm font-medium text-gray-600">
                {stars} stars
              </span>
              <Progress
                value={
                  ratingStats.total_ratings > 0
                    ? (ratingStats.rating_distribution[index] /
                        ratingStats.total_ratings) *
                      100
                    : 0
                }
                className="h-2.5 flex-1"
              />
              <span className="w-12 text-sm text-gray-600 font-medium">
                {ratingStats.rating_distribution[index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* User Reviews Section */}
      {userReviews && userReviews.length > 0 && (
        <div className="space-y-4">
          <Button
            variant="link"
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="flex items-center gap-2 text-primary hover:text-primary/90"
          >
            {showAllReviews ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                See All User Reviews <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>

          {showAllReviews && (
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <div className="space-y-4">
                {userReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 border rounded-lg bg-white space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{review.user_name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div>{renderStars(review.rating)}</div>
                    </div>
                    <p className="text-gray-700">{review.review_text}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      )}

      {/* Rating Input */}
      <div className="p-8 bg-white rounded-xl shadow-md border border-gray-100 space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 text-center">
          Rate this product
        </h3>
        <div className="flex flex-col items-center gap-6">
          {renderStars(selectedRating, true)}
          <Textarea
            placeholder="Write your review (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full min-h-[120px] resize-none border-gray-200 focus:border-primary"
          />
          <Button 
            onClick={handleRatingSubmit}
            className="w-full md:w-auto min-w-[200px] bg-primary hover:bg-primary/90 text-white"
          >
            Submit Rating & Review
          </Button>
        </div>
      </div>
    </div>
  );
}