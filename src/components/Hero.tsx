import React, { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Lazy load Aurora to prevent blocking LCP
const Aurora = lazy(() => import("./Aurora"));

const Hero: React.FC = () => {
  const taglines = [
    "Redefining Technology with NASIR ABSAR: Unlock the Possibilities.",
    "Your Trusted Advocates - Let NASIR ABSAR Help You Win Your Case!",
    "Investing in Your Future with NASIR ABSAR",
  ];
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden w-full max-w-full pt-10 sm:pt-20 pb-12 sm:pb-16"
      style={{
        touchAction: "pan-y",
      }}
    >
      {/* Background - Black */}
      <div className="absolute inset-0 bg-black" />

      {/* Aurora Background - Lazy loaded to prevent blocking LCP */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: "none",
          touchAction: "none",
          zIndex: 0,
        }}
      >
        <Suspense fallback={<div className="aurora-container" />}>
          <Aurora
            colorStops={["#1E90FF", "#0000FF", "#3A29FF"]}
            blend={0.1}
            amplitude={0.7}
            speed={1}
            height={"160%"}
          />
        </Suspense>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8 w-full max-w-full">
        <div className="flex flex-col items-center gap-6 lg:gap-8 w-full max-w-5xl mx-auto text-center">
          <div
            className="text-white flex flex-col items-center text-center w-full"
            style={{ willChange: "auto" }}
          >
            <h1
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold mb-3 sm:mb-3 md:mb-4 leading-tight"
              style={{
                willChange: "auto",
                contentVisibility: "auto",
              }}
            >
              Excellence in
              <span className="text-blue-300 block">Financial Services</span>
            </h1>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4 w-full justify-center max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                type: "spring",
                damping: 25,
                stiffness: 100,
                duration: 0.8,
              }}
              style={{ willChange: "transform, opacity" }}
            >
              <motion.a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, "", "/contact");
                  const element = document.getElementById("contact");
                  if (element) {
                    setTimeout(() => {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100);
                  }
                }}
                className="glass-button text-white px-4 sm:px-5 md:px-6 py-3 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center space-x-1.5 sm:space-x-2 text-sm sm:text-sm md:text-base w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{ willChange: "transform" }}
              >
                <span className="truncate">Get Consultation</span>
                <ArrowRight
                  size={14}
                  className="sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0"
                />
              </motion.a>

              <motion.a
                href="/services"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, "", "/services");
                  const element = document.getElementById("services");
                  if (element) {
                    setTimeout(() => {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100);
                  }
                }}
                className="glass border-2 border-white/30 text-white hover:bg-white/20 px-4 sm:px-5 md:px-6 py-3 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-semibold backdrop-blur-md text-sm sm:text-sm md:text-base w-full sm:w-auto whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{ willChange: "transform" }}
              >
                Our Services
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="relative w-full flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 100,
              duration: 0.8,
              delay: 0.35,
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <div
              className="relative z-10 rounded-xl sm:rounded-2xl p-5 xs:p-5 sm:p-6 border border-white/60 shadow-2xl backdrop-blur-3xl w-full max-w-xl mx-auto"
              style={{
                background: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(30px) saturate(100%)",
                WebkitBackdropFilter: "blur(30px) saturate(100%)",
                boxShadow:
                  "0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentTagline}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-snug drop-shadow-lg min-h-24 sm:min-h-28 md:min-h-32 flex items-center justify-center text-center"
                  >
                    {taglines[currentTagline]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="hidden md:block absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
