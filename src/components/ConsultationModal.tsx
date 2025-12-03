import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ConsultationForm from "./ConsultationForm";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
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
  useEffect(() => {
    if (!isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      if (!modalRef.current || !contentRef.current) {
        e.preventDefault();
        return;
      }
      
      const target = e.target as HTMLElement;
      const isInsideModal = modalRef.current.contains(target);
      
      if (!isInsideModal) {
        // Prevent scrolling outside modal
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      
      // Inside modal - check if we can scroll
      const contentEl = contentRef.current;
      const isAtTop = contentEl.scrollTop <= 0;
      const isAtBottom = contentEl.scrollTop + contentEl.clientHeight >= contentEl.scrollHeight - 1;
      
      // If at boundaries and trying to scroll further, prevent default
      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!modalRef.current) {
        e.preventDefault();
        return;
      }
      
      const target = e.target as HTMLElement;
      const isInsideModal = modalRef.current.contains(target);
      
      if (!isInsideModal) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Use capture phase to catch events early
    document.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('wheel', handleWheel, { capture: true });
      document.removeEventListener('touchmove', handleTouchMove, { capture: true });
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleFormSubmit = () => {
    // Close modal after successful submission
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={modalRef}
              className="glass-card rounded-2xl max-w-2xl w-full max-h-[90vh] border border-white/50 shadow-2xl relative pointer-events-auto flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full glass-light hover:bg-red-500/20 text-gray-600 hover:text-red-600 transition-all duration-300 z-10"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Form Content - Scrollable */}
              <div ref={contentRef} className="p-6 sm:p-8 overflow-y-auto flex-1">
                <ConsultationForm onSubmit={handleFormSubmit} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConsultationModal;

