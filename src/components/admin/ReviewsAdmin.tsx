import React, { useState, useEffect } from 'react';
import { Check, X, Trash2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
  id: string;
  name: string;
  title: string;
  review: string;
  submittedAt: string;
  approvedAt?: string;
  approvedBy?: string;
}

const ReviewsAdmin: React.FC = () => {
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const apiUrl = import.meta.env.PROD
    ? `${window.location.origin}/api/reviews`
    : '/api/reviews.php';

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError('');

      const [pendingRes, approvedRes] = await Promise.all([
        fetch(`${apiUrl}?status=pending`),
        fetch(`${apiUrl}?status=approved`),
      ]);

      if (!pendingRes.ok || !approvedRes.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const pending = await pendingRes.json();
      const approved = await approvedRes.json();

      setPendingReviews(pending);
      setApprovedReviews(approved);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (reviewId: string) => {
    try {
      setActionLoading(reviewId);
      const response = await fetch(`${apiUrl}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin',
        },
        body: JSON.stringify({ id: reviewId }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve review');
      }

      await fetchReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve review');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (reviewId: string) => {
    try {
      setActionLoading(reviewId);
      const response = await fetch(`${apiUrl}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin',
        },
        body: JSON.stringify({ id: reviewId }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject review');
      }

      await fetchReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject review');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (reviewId: string, from: 'pending' | 'approved') => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      setActionLoading(reviewId);
      const response = await fetch(`${apiUrl}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin',
        },
        body: JSON.stringify({ id: reviewId, from }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      await fetchReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete review');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Review Management</h2>
          <p className="text-gray-600 mt-1">
            {pendingReviews.length} pending, {approvedReviews.length} approved
          </p>
        </div>
        <motion.button
          onClick={fetchReviews}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </motion.button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Pending Reviews */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Pending Reviews ({pendingReviews.length})
        </h3>
        {pendingReviews.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            No pending reviews
          </div>
        ) : (
          <div className="space-y-4">
            {pendingReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    {review.title && (
                      <p className="text-sm text-gray-600">{review.title}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Submitted: {new Date(review.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{review.review}</p>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => handleApprove(review.id)}
                    disabled={actionLoading === review.id}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                    whileHover={{ scale: actionLoading === review.id ? 1 : 1.05 }}
                    whileTap={{ scale: actionLoading === review.id ? 1 : 0.95 }}
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </motion.button>
                  <motion.button
                    onClick={() => handleReject(review.id)}
                    disabled={actionLoading === review.id}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                    whileHover={{ scale: actionLoading === review.id ? 1 : 1.05 }}
                    whileTap={{ scale: actionLoading === review.id ? 1 : 0.95 }}
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(review.id, 'pending')}
                    disabled={actionLoading === review.id}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                    whileHover={{ scale: actionLoading === review.id ? 1 : 1.05 }}
                    whileTap={{ scale: actionLoading === review.id ? 1 : 0.95 }}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Approved Reviews */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Approved Reviews ({approvedReviews.length})
        </h3>
        {approvedReviews.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            No approved reviews
          </div>
        ) : (
          <div className="space-y-4">
            {approvedReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    {review.title && (
                      <p className="text-sm text-gray-600">{review.title}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Approved: {review.approvedAt ? new Date(review.approvedAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{review.review}</p>
                <motion.button
                  onClick={() => handleDelete(review.id, 'approved')}
                  disabled={actionLoading === review.id}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                  whileHover={{ scale: actionLoading === review.id ? 1 : 1.05 }}
                  whileTap={{ scale: actionLoading === review.id ? 1 : 0.95 }}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ReviewsAdmin;

