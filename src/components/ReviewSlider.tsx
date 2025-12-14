import React, { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  title: string;
  review: string;
}

interface ReviewSliderProps {
  reviews: Review[];
}

const ReviewSlider: React.FC<ReviewSliderProps> = ({ reviews }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const scrollPositionRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const isVisibleRef = useRef(false);

  useEffect(() => {
    if (!sliderRef.current || reviews.length === 0) return;

    const scrollContainer = sliderRef.current;
    scrollPositionRef.current = 0;
    scrollContainer.scrollLeft = 0;

    // Use IntersectionObserver to only animate when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (!entry.isIntersecting && animationFrameRef.current) {
            // Pause animation when not visible
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = undefined;
          } else if (entry.isIntersecting && !animationFrameRef.current) {
            // Resume animation when visible
            lastTimeRef.current = performance.now();
            animationFrameRef.current = requestAnimationFrame(animate);
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
      scrollPositionRef.current += 0.5 * Math.min(deltaTime / 16, 2);

      // Get the width of one set of reviews (since we have 2 sets, divide by 2)
      const singleSetWidth = scrollContainer.scrollWidth / 2;

      // Reset scroll position when reaching the end of first set for seamless loop
      if (scrollPositionRef.current >= singleSetWidth) {
        scrollPositionRef.current = 0;
      }

      scrollContainer.scrollLeft = scrollPositionRef.current;

      if (isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation only if visible
    if (isVisibleRef.current) {
      lastTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [reviews]);

  if (reviews.length === 0) {
    return null;
  }

  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div className="relative py-4" style={{ overflowX: 'hidden', overflowY: 'visible', paddingBottom: '6rem', minHeight: 'auto' }}>
      <div className="relative" style={{ overflowY: 'visible', minHeight: 'auto' }}>
        <div
          ref={sliderRef}
          className="flex gap-6 md:gap-8 items-stretch scrollbar-hide"
          style={{
            willChange: 'transform',
            overflowX: 'hidden',
            overflowY: 'visible',
            paddingRight: '200px',
            paddingBottom: '4rem',
            pointerEvents: 'none',
            userSelect: 'none',
            touchAction: 'none',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            minHeight: 'auto',
          }}
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
          onScroll={(e) => e.preventDefault()}
        >
          {duplicatedReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="flex-shrink-0 w-80 sm:w-96 bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-shadow"
              style={{ marginBottom: '0' }}
            >
              <div className="flex items-center space-x-3 text-blue-600 mb-4">
                <Quote className="w-6 h-6" />
                <span className="font-semibold text-sm uppercase tracking-wide">Review</span>
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 flex-1">
                {review.review}
              </p>
              <div>
                <p className="text-gray-900 font-semibold text-sm sm:text-base">
                  {review.name}
                </p>
                {review.title && (
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    {review.title}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSlider;

