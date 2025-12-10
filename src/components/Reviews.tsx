import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, X } from "lucide-react";

const reviews = [
  {
    quote:
      "I’ve worked with Nasir Absar as they have provided expert tax and legal advice related to operating in Pakistan. Nasir Absar is quick to respond to queries and provides thorough explanation, and is available for follow up questions when it’s needed. I would recommend Nasir Absar to anyone looking for taxation and legal advisory services in Pakistan.",
    author: "Molly Tutt, Associate Director (Programs), TASK FORCE for GLOBAL HEALTH-USA",
  },
  {
    quote:
      "Nasir Absar is actually a problem solver for your tax and accounting matters, having worked with them in the recent past. They are focused on getting to the right solutions, and their knowledge of taxation and financial reporting standards is very good. Apart from being very good professionals, they are also very kind hearted and courteous. I highly recommend their services.",
    author: "Abdul Basit Manzoor, Manager Finance, Menzies- RAS (Pvt.) Limited",
  },
  {
    quote:
      "With their explicit command over tax laws and practical insight, I found Nasir Absar to be very diligent, proficient and precise in all their consultations. Their listening aptitude and courteous conduct set them apart among consultants in this profession.",
    author: "Bilal Sarwar, Manager Finance & Accounting, Sukh Chayn Valley (Pvt.) Limited",
  },
];

const Reviews: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    review: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hook up to backend or state store as needed
    setIsModalOpen(false);
    setFormData({ name: "", title: "", review: "" });
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white via-blue-50/10 to-gray-50 w-full max-w-full">
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

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 border border-white/60 shadow-lg flex flex-col space-y-4"
            >
              <div className="flex items-center space-x-3 text-blue-600">
                <Quote className="w-6 h-6" />
                <span className="font-semibold text-sm uppercase tracking-wide">Review</span>
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed flex-1">
                {item.quote}
              </p>
              <p className="text-gray-900 font-semibold text-sm sm:text-base leading-snug">
                {item.author}
              </p>
            </motion.div>
          ))}
        </div>
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

                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      className="glass-button text-white px-5 py-2.5 rounded-lg font-semibold text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Submit Review
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

