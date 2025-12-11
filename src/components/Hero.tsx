import React, { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Lazy load Aurora to prevent blocking LCP
const Aurora = lazy(() => import("./Aurora"));

const Hero: React.FC = () => {
  const taglines = [
    <>
      Redefining Technology with <span className="text-blue-300">NASIR ABSAR:</span>
      <br />
      Unlock the Possibilities.
    </>,
    <>
      Your Trusted Advocates
      <br />
      <span className="text-blue-300">Let NASIR ABSAR</span> Help You Win Your Case!
    </>,
    <>
      Investing in Your Future
      <br />
      <span className="text-blue-300">with NASIR ABSAR</span>
    </>,
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
            <div
              className="relative z-10 rounded-xl sm:rounded-2xl p-6 xs:p-6 sm:p-8 md:p-10 w-full max-w-4xl mx-auto mb-6 sm:mb-6 md:mb-8 shadow-xl"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              }}
            >
              <div
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-relaxed min-h-[8rem] xs:min-h-[9rem] sm:min-h-[10rem] md:min-h-[11rem] lg:min-h-[11rem] xl:min-h-[12rem] flex items-center justify-center"
                style={{
                  willChange: "auto",
                  contentVisibility: "auto",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentTagline}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="text-white text-center w-full"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {taglines[currentTagline]}
                  </motion.h1>
                </AnimatePresence>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-6 md:mb-8 w-full max-w-4xl mx-auto">
              <div
                className="relative z-10 rounded-lg sm:rounded-xl p-3 xs:p-3 sm:p-4 md:p-5 shadow-xl text-center flex-1"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                }}
              >
                <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-1">
                  25+
                </div>
                <div className="text-xs xs:text-xs sm:text-sm md:text-base text-white/90 font-medium">
                  Years Experience
                </div>
              </div>
              <div
                className="relative z-10 rounded-lg sm:rounded-xl p-3 xs:p-3 sm:p-4 md:p-5 shadow-xl text-center flex-1"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                }}
              >
                <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-1">
                  500+
                </div>
                <div className="text-xs xs:text-xs sm:text-sm md:text-base text-white/90 font-medium">
                  Happy Clients
                </div>
              </div>
              <div
                className="relative z-10 rounded-lg sm:rounded-xl p-3 xs:p-3 sm:p-4 md:p-5 shadow-xl text-center flex-1"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                }}
              >
                <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-1">
                  98%
                </div>
                <div className="text-xs xs:text-xs sm:text-sm md:text-base text-white/90 font-medium">
                  Success Rate
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4 w-full justify-center max-w-xl">
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
            </div>
          </div>
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
