import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, RefreshCw, Trash2 } from "lucide-react";

interface Review {
  id: string;
  name: string;
  title: string;
  review: string;
  submittedAt?: string;
  approvedAt?: string;
}

const ReviewsAdmin: React.FC = () => {
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      // Use root domain (without www) for production - points to cPanel
      // www.nasirabsar.com points to Vercel, nasirabsar.com points to cPanel
      const apiUrl = import.meta.env.PROD 
        ? 'https://nasirabsar.com/api/reviews.php'
        : '/api/reviews.php';

      const [pendingRes, approvedRes] = await Promise.all([
        fetch(`${apiUrl}?status=pending`),
        fetch(`${apiUrl}?status=approved`),
      ]);

      const pendingData = await pendingRes.json();
      const approvedData = await approvedRes.json();

      if (pendingData.success) {
        setPendingReviews(pendingData.reviews || []);
      }
      if (approvedData.success) {
        setApprovedReviews(approvedData.reviews || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (reviewId: string) => {
    setIsProcessing(reviewId);
    try {
      // Use root domain (without www) for production - points to cPanel
      // www.nasirabsar.com points to Vercel, nasirabsar.com points to cPanel
      const apiUrl = import.meta.env.PROD 
        ? 'https://nasirabsar.com/api/reviews.php'
        : '/api/reviews.php';

      const approveUrl = apiUrl.includes('.php') 
        ? apiUrl.replace('.php', '.php/approve')
        : `${apiUrl}/approve`;
      
      const response = await fetch(approveUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: reviewId }),
      });

      const data = await response.json();
      if (data.success) {
        await fetchReviews();
      } else {
        alert(data.error || 'Failed to approve review');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsProcessing(null);
    }
  };

  const handleReject = async (reviewId: string) => {
    if (!confirm('Are you sure you want to reject this review?')) {
      return;
    }

    setIsProcessing(reviewId);
    try {
      // Use root domain (without www) for production - points to cPanel
      // www.nasirabsar.com points to Vercel, nasirabsar.com points to cPanel
      const apiUrl = import.meta.env.PROD 
        ? 'https://nasirabsar.com/api/reviews.php'
        : '/api/reviews.php';

      const rejectUrl = apiUrl.includes('.php') 
        ? apiUrl.replace('.php', '.php/reject')
        : `${apiUrl}/reject`;
      
      const response = await fetch(rejectUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: reviewId }),
      });

      const data = await response.json();
      if (data.success) {
        await fetchReviews();
      } else {
        alert(data.error || 'Failed to reject review');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsProcessing(null);
    }
  };

  const handleDelete = async (reviewId: string, status: 'pending' | 'approved') => {
    if (!confirm('Are you sure you want to permanently delete this review? This action cannot be undone.')) {
      return;
    }

    setIsProcessing(reviewId);
    try {
      // Use root domain (without www) for production - points to cPanel
      // www.nasirabsar.com points to Vercel, nasirabsar.com points to cPanel
      const apiUrl = import.meta.env.PROD 
        ? 'https://nasirabsar.com/api/reviews.php'
        : '/api/reviews.php';

      const deleteUrl = apiUrl.includes('.php') 
        ? apiUrl.replace('.php', '.php/delete')
        : `${apiUrl}/delete`;
      
      const response = await fetch(deleteUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: reviewId, status }),
      });

      const data = await response.json();
      if (data.success) {
        await fetchReviews();
      } else {
        alert(data.error || 'Failed to delete review');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsProcessing(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Review Management</h2>
          <p className="text-gray-600 mt-1">
            {pendingReviews.length} pending • {approvedReviews.length} approved
          </p>
        </div>
        <motion.button
          onClick={fetchReviews}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </motion.button>
      </div>

      {/* Pending Reviews */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Pending Reviews ({pendingReviews.length})
        </h3>
        {pendingReviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600">No pending reviews</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {review.name}
                      {review.title && <span className="text-gray-600 font-normal">, {review.title}</span>}
                    </h4>
                    {review.submittedAt && (
                      <p className="text-sm text-gray-500 mt-1">
                        Submitted: {new Date(review.submittedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={() => handleApprove(review.id)}
                      disabled={isProcessing === review.id}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve</span>
                    </motion.button>
                    <motion.button
                      onClick={() => handleReject(review.id)}
                      disabled={isProcessing === review.id}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(review.id, 'pending')}
                      disabled={isProcessing === review.id}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gray-600 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </motion.button>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.review}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Reviews */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Approved Reviews ({approvedReviews.length})
        </h3>
        {approvedReviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600">No approved reviews yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {approvedReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm relative"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 flex-1">
                    {review.name}
                    {review.title && <span className="text-gray-600 font-normal">, {review.title}</span>}
                  </h4>
                  <motion.button
                    onClick={() => handleDelete(review.id, 'approved')}
                    disabled={isProcessing === review.id}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gray-600 hover:bg-gray-700 disabled:opacity-50 transition-colors ml-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </motion.button>
                </div>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed line-clamp-3">
                  {review.review}
                </p>
                {review.approvedAt && (
                  <p className="text-xs text-gray-500 mt-2">
                    Approved: {new Date(review.approvedAt).toLocaleString()}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsAdmin;

