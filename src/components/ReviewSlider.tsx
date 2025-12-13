import React, { useEffect, useRef } from "react";
import { Quote } from "lucide-react";

interface Review {
  id: string;
  name: string;
  title: string;
  review: string;
  submittedAt?: string;
  approvedAt?: string;
}

interface ReviewSliderProps {
  reviews: Review[];
  speed?: number; // pixels per frame
}

const ReviewSlider: React.FC<ReviewSliderProps> = ({ reviews, speed = 0.5 }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const isVisibleRef = useRef(false);

  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Intersection Observer to only animate when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting && !animationRef.current) {
            lastTimeRef.current = performance.now();
            animate(performance.now());
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(scrollContainer);

    const animate = (currentTime: number) => {
      if (!scrollContainer || !isVisibleRef.current) return;

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Throttle animation based on frame time (normalize to 60fps)
      scrollPositionRef.current += speed * Math.min(deltaTime / 16, 2);

      // Get the width of one set of reviews (since we have 2 sets, divide by 2)
      const singleSetWidth = scrollContainer.scrollWidth / 2;

      // Reset scroll position when reaching the end of first set for seamless loop
      if (scrollPositionRef.current >= singleSetWidth) {
        scrollPositionRef.current = 0;
      }

      scrollContainer.scrollLeft = scrollPositionRef.current;

      if (isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation only if visible
    if (isVisibleRef.current) {
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [reviews.length, speed]);

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-x-auto overflow-y-visible pb-4 scrollbar-hide">
      <div
        ref={scrollRef}
        className="flex gap-6 sm:gap-8 pb-2"
        style={{
          width: "max-content",
        }}
      >
        {duplicatedReviews.map((review, index) => (
          <div
            key={`${review.id}-${index}`}
            className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col space-y-4 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-3 text-blue-600">
              <Quote className="w-6 h-6" />
              <span className="font-semibold text-sm uppercase tracking-wide">Review</span>
            </div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed flex-1">
              {review.review}
            </p>
            <p className="text-gray-900 font-semibold text-sm sm:text-base leading-snug">
              {review.name}
              {review.title && `, ${review.title}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSlider;

