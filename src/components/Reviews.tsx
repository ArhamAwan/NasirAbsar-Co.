import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, X } from "lucide-react";
import ReviewSlider from "./ReviewSlider";

interface Review {
  id: string;
  name: string;
  title: string;
  review: string;
  submittedAt?: string;
  approvedAt?: string;
}

const Reviews: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    review: "",
  });
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Fetch approved reviews on component mount
  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const apiUrl = import.meta.env.PROD 
          ? 'https://nasirabsar.com/api/reviews.php?status=approved'
          : '/api/reviews.php?status=approved';
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && Array.isArray(data.reviews)) {
          setApprovedReviews(data.reviews);
        } else {
          // If no reviews yet, set empty array
          setApprovedReviews([]);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Set empty array on error to prevent crashes
        setApprovedReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprovedReviews();
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitMessage(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const apiUrl = import.meta.env.PROD 
        ? 'https://nasirabsar.com/api/reviews.php'
        : '/api/reviews.php';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage({ type: 'success', text: data.message || 'Review submitted successfully!' });
        setFormData({ name: "", title: "", review: "" });
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitMessage(null);
        }, 2000);
      } else {
        setSubmitMessage({ type: 'error', text: data.error || 'Failed to submit review. Please try again.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Network error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white via-blue-50/10 to-gray-50 w-full max-w-full">
      <div className="container mx-auto px-4 sm:px-6 w-full max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-2">
            Comments & Reviews
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            A Reputation for Superior Service
          </p>
          <motion.button
            className="mt-5 glass-button text-white px-5 py-2.5 rounded-lg font-semibold inline-flex items-center space-x-2 transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
          >
            <span>Add Review</span>
          </motion.button>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : approvedReviews.length > 0 ? (
          <div className="py-4 overflow-visible">
            <ReviewSlider reviews={approvedReviews} speed={50} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              className="fixed inset-0 z-[130] flex items-center justify-center px-4"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
            >
              <div className="glass-card w-full max-w-2xl rounded-2xl border border-white/60 shadow-2xl bg-white/95 p-6 sm:p-7 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Add a Review
                    </h3>
                    <p className="text-sm text-gray-600">
                      Share your experience with Nasir Absar.
                    </p>
                  </div>
                  <button
                    aria-label="Close"
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      Name & Title
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={onChange}
                      required
                      className="w-full glass-light border border-white/60 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-sm"
                      placeholder="Your name and role"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      Review Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={onChange}
                      className="w-full glass-light border border-white/60 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-sm"
                      placeholder="Short title (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      Your Review
                    </label>
                    <textarea
                      name="review"
                      value={formData.review}
                      onChange={onChange}
                      rows={5}
                      required
                      className="w-full glass-light border border-white/60 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-sm resize-none"
                      placeholder="Write your feedback..."
                    />
                  </div>

                  {submitMessage && (
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        submitMessage.type === 'success'
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {submitMessage.text}
                    </div>
                  )}

                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                      onClick={() => {
                        setIsModalOpen(false);
                        setSubmitMessage(null);
                      }}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      className="glass-button text-white px-5 py-2.5 rounded-lg font-semibold text-sm disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Reviews;

