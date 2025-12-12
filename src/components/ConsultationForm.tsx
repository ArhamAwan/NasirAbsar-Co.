import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ConsultationFormProps {
  onSubmit?: () => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const services = [
    "Accounting Services",
    "Auditing",
    "Tax Services",
    "Financial Advisory",
    "Corporate Services",
    "Business Consulting",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/send-consultation.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to send message. Please try again.');
      }

      // Success - show success message
      setIsSubmitted(true);
      setIsLoading(false);
      
      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        if (onSubmit) {
          onSubmit();
        }
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h3 className="text-xl xs:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
        Get Consultation
      </h3>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            Message Sent!
          </h4>
          <p className="text-gray-600 text-sm">
            Thank you for contacting us. We'll get back to you soon.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">Error</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </motion.div>
          )}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="modal-name"
                className="block text-xs font-medium text-gray-700 mb-1.5"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="modal-name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2.5 glass-light border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm text-sm"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label
                htmlFor="modal-email"
                className="block text-xs font-medium text-gray-700 mb-1.5"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="modal-email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2.5 glass-light border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm text-sm"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="modal-phone"
                className="block text-xs font-medium text-gray-700 mb-1.5"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="modal-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2.5 glass-light border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm text-sm"
                placeholder="+92-300-1234567"
              />
            </div>

            <div>
              <label
                htmlFor="modal-service"
                className="block text-xs font-medium text-gray-700 mb-1.5"
              >
                Service Interested In
              </label>
              <select
                id="modal-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3 py-2.5 glass-light border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm text-sm"
              >
                <option value="">Select a service</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="modal-message"
              className="block text-xs font-medium text-gray-700 mb-1.5"
            >
              Message *
            </label>
            <textarea
              id="modal-message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2.5 glass-light border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 resize-none backdrop-blur-sm text-sm"
              placeholder="Tell us about your requirements..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full glass-button text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={isLoading ? {} : { scale: 1.02 }}
            whileTap={isLoading ? {} : { scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Send Message</span>
              </>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
};

export default ConsultationForm;

