import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    features: string[];
    detailedDescription: string;
  } | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (!isOpen) return;

    // Save current scroll position
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll position after a small delay to let React finish updating
      requestAnimationFrame(() => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo({ top: scrollY, behavior: 'instant' });
      });
    };
  }, [isOpen]);

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          />
          
          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={modalRef}
              className="glass-card rounded-3xl max-w-4xl w-full max-h-[90vh] shadow-2xl border border-white/50 backdrop-blur-xl flex flex-col overflow-hidden pointer-events-auto bg-white/95"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="glass-button bg-gradient-to-r from-blue-600/90 to-indigo-700/90 backdrop-blur-xl text-white p-6 sm:p-8 rounded-t-3xl flex-shrink-0 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl sm:text-3xl font-bold mb-2">{service.title}</h2>
                      <p className="text-blue-100 text-sm sm:text-lg line-clamp-2">{service.description}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onClose();
                    }}
                    className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors flex-shrink-0 ml-4"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div ref={contentRef} className="p-6 sm:p-8 overflow-y-auto flex-1">
                {/* Features Grid */}
                <div className="mb-8">
                  <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                    {service.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        className="flex items-start space-x-3 p-3 sm:p-4 glass-light rounded-xl hover:bg-white/90 transition-all duration-300 border border-white/40"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium text-sm sm:text-base">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Benefits Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-light bg-white/80 rounded-2xl p-6 border border-white/50 backdrop-blur-sm"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Why Choose Our {service.title}?</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Expert Team</h4>
                      <p className="text-gray-600 text-sm">Qualified professionals with extensive experience</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Proven Results</h4>
                      <p className="text-gray-600 text-sm">25+ years of successful client outcomes</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Tailored Solutions</h4>
                      <p className="text-gray-600 text-sm">Customized approach for your specific needs</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;


