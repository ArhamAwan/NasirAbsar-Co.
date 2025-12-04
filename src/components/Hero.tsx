import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import * as THREE from "three";

// Logo blue color: rgba(43, 149, 222)
const LOGO_BLUE = new THREE.Color(0x2b95de);

// Typing animation hook
const useTypingAnimation = (
  text: string,
  speed: number = 50,
  delay: number = 0
) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (text.length === 0) return;

    setDisplayedText("");
    setIsComplete(false);

    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayedText, isComplete };
};

const AnimatedSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const [scale, setScale] = useState(2.4);
  const [opacity, setOpacity] = useState(0.5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Mobile
        setScale(1.2);
        setOpacity(0.4);
      } else if (window.innerWidth < 1024) {
        // Tablet
        setScale(1.8);
        setOpacity(0.45);
      } else {
        // Desktop
        setScale(2.4);
        setOpacity(0.5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.getElapsedTime();

    // Simple floating animation without any mouse interaction
    meshRef.current.position.x = Math.sin(time * 0.5) * 0.3;
    meshRef.current.position.y = Math.cos(time * 0.3) * 0.4;
    meshRef.current.position.z = Math.sin(time * 0.4) * 0.2;

    // Simple rotation without mouse influence
    meshRef.current.rotation.x += Math.sin(time * 0.2) * 0.001;
    meshRef.current.rotation.y += Math.cos(time * 0.15) * 0.001;
    meshRef.current.rotation.z += Math.sin(time * 0.1) * 0.0005;

    // Simple pulsing scale
    const basePulse = 1 + Math.sin(time * 1.2) * 0.05;
    meshRef.current.scale.setScalar(scale * basePulse);

    // Fixed distortion and opacity
    materialRef.current.distort = 0.4;
    materialRef.current.opacity = opacity;

    // Ensure color stays consistent
    if (materialRef.current.color.getHex() !== LOGO_BLUE.getHex()) {
      materialRef.current.color.copy(LOGO_BLUE);
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={scale}>
        <MeshDistortMaterial
          ref={materialRef}
          color={LOGO_BLUE}
          attach="material"
          distort={0.4}
          speed={2.5}
          roughness={0}
          transparent
          opacity={opacity}
        />
      </Sphere>
    </Float>
  );
};

const Hero: React.FC = () => {
  const stats = [
    { icon: Award, value: "25+", label: "Years Experience" },
    { icon: Users, value: "500+", label: "Satisfied Clients" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
  ];

  const whyChooseUsItems = [
    {
      title: "Certified Chartered Accountants",
      description: "Highly qualified professionals",
    },
    {
      title: "25+ Years of Industry Experience",
      description: "Proven track record of excellence",
    },
    {
      title: "Located in I-8, Islamabad",
      description: "Convenient central location",
    },
    {
      title: "Comprehensive Financial Solutions",
      description: "End-to-end accounting services",
    },
  ];

  // Typing animations for titles
  const item1Title = useTypingAnimation(whyChooseUsItems[0].title, 50, 800);
  const item2Title = useTypingAnimation(whyChooseUsItems[1].title, 50, 1300);
  const item3Title = useTypingAnimation(whyChooseUsItems[2].title, 50, 1800);
  const item4Title = useTypingAnimation(whyChooseUsItems[3].title, 50, 2300);

  // Typing animations for descriptions (start after titles finish)
  const item1Desc = useTypingAnimation(
    whyChooseUsItems[0].description,
    50,
    800 + whyChooseUsItems[0].title.length * 50 + 200
  );
  const item2Desc = useTypingAnimation(
    whyChooseUsItems[1].description,
    50,
    1300 + whyChooseUsItems[1].title.length * 50 + 200
  );
  const item3Desc = useTypingAnimation(
    whyChooseUsItems[2].description,
    50,
    1800 + whyChooseUsItems[2].title.length * 50 + 200
  );
  const item4Desc = useTypingAnimation(
    whyChooseUsItems[3].description,
    50,
    2300 + whyChooseUsItems[3].title.length * 50 + 200
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start overflow-x-hidden w-full max-w-full pt-20 sm:pt-24"
      style={{
        touchAction: "pan-y",
      }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900" />

      {/* Three.js Background */}
      <div
        className="absolute inset-0"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          pointerEvents: "none",
          touchAction: "none",
          zIndex: 0,
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5] }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{
            pointerEvents: "none",
            touchAction: "none",
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} />
            <AnimatedSphere />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-6 md:py-8 w-full max-w-full">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-6 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 100,
              duration: 0.8,
            }}
            className="text-white"
            style={{ willChange: "transform, opacity" }}
          >
            <motion.h1
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-2 md:mb-3 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                type: "spring",
                damping: 25,
                stiffness: 100,
                duration: 0.8,
              }}
              style={{ willChange: "transform, opacity" }}
            >
              Excellence in
              <span className="text-blue-300 block">Financial Services</span>
            </motion.h1>

            <motion.p
              className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-3 md:mb-4 text-blue-100 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                type: "spring",
                damping: 25,
                stiffness: 100,
                duration: 0.8,
              }}
              style={{ willChange: "transform, opacity" }}
            >
              Nasir Absar & Co. provides comprehensive accounting, auditing, and
              financial consulting services in Islamabad with over 25 years of
              trusted expertise.
            </motion.p>

            <motion.div
              className="flex flex-row gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-4 md:mb-5 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
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
                className="glass-button text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm md:text-base flex-1 sm:flex-initial"
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
                className="glass border-2 border-white/30 text-white hover:bg-white/20 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-semibold backdrop-blur-md text-xs sm:text-sm md:text-base flex-1 sm:flex-initial whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{ willChange: "transform" }}
              >
                Our Services
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                type: "spring",
                damping: 25,
                stiffness: 100,
                duration: 0.8,
              }}
              style={{ willChange: "transform, opacity" }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass text-center p-1.5 xs:p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-white/20 backdrop-blur-md min-w-0"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  style={{ willChange: "transform" }}
                >
                  <stat.icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto mb-0.5 xs:mb-1 sm:mb-2 text-blue-300 flex-shrink-0" />
                  <div className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white truncate">
                    {stat.value}
                  </div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-blue-200 line-clamp-2 leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-full mt-6 lg:mt-0 flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 100,
              duration: 0.8,
              delay: 0.3,
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <div
              className="relative z-10 rounded-xl sm:rounded-2xl p-5 xs:p-5 sm:p-6 border border-white/60 shadow-2xl backdrop-blur-3xl w-full max-w-lg mx-auto"
              style={{
                background: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(30px) saturate(100%)",
                WebkitBackdropFilter: "blur(30px) saturate(100%)",
                boxShadow:
                  "0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-4 md:mb-5 text-left drop-shadow-lg">
                Why Choose Us?
              </h3>
              <ul className="space-y-3 xs:space-y-2.5 sm:space-y-3 text-white">
                <li className="flex items-start space-x-2 xs:space-x-3 sm:space-x-3.5">
                  <div
                    className="flex-shrink-0 w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-lg mt-0.5"
                    style={{
                      background: "rgba(147, 197, 253, 0.8)",
                    }}
                  >
                    <CheckCircle className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-xs xs:text-sm sm:text-base mb-0.5 drop-shadow-md">
                      {item1Title.displayedText}
                      {!item1Title.isComplete && (
                        <span className="animate-pulse">|</span>
                      )}
                    </div>
                    <div className="text-white/90 text-xs xs:text-xs sm:text-sm leading-relaxed">
                      {item1Desc.displayedText}
                      {!item1Desc.isComplete && (
                        <span className="animate-pulse">|</span>
                      )}
                    </div>
                  </div>
                </li>
                <li className="flex items-start space-x-2 xs:space-x-3 sm:space-x-3.5">
                  <div
                    className="flex-shrink-0 w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-lg mt-0.5"
                    style={{
                      background: "rgba(147, 197, 253, 0.8)",
                    }}
                  >
                    <CheckCircle className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-xs xs:text-sm sm:text-base mb-0.5 drop-shadow-md">
                      {item2Title.displayedText}
                      {!item2Title.isComplete && (
                        <span className="animate-pulse">|</span>
                      )}
                    </div>
                    <div className="text-white/90 text-xs xs:text-xs sm:text-sm leading-relaxed">
                      {item2Desc.displayedText}
                      {!item2Desc.isComplete && (
                        <span className="animate-pulse">|</span>
                      )}
                    </div>
                  </div>
                </li>
                <li className="flex items-start space-x-2 xs:space-x-3 sm:space-x-3.5">
                  <div
                    className="flex-shrink-0 w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-lg mt-0.5"
                    style={{
                      background: "rgba(147, 197, 253, 0.8)",
                    }}
                  >
                    <CheckCircle className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-xs xs:text-sm sm:text-base mb-0.5 drop-shadow-md">
                      {item3Title.displayedText}
                      {!item3Title.isComplete && (
                        <span className="animate-pulse">|</span>
                      )}
                    </div>
                    <div className="text-white/90 text-xs xs:text-xs sm:text-sm leading-relaxed">
                      {item3Desc.displayedText}
                      {!item3Desc.isComplete && (
                        <span className="animate-pulse">|</span>
                      )}
                    </div>
                  </div>
                </li>
                <li className="flex items-start space-x-2 xs:space-x-3 sm:space-x-3.5">
                  <div
                    className="flex-shrink-0 w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-lg mt-0.5"
                    style={{
                      background: "rgba(147, 197, 253, 0.8)",
                    }}
                  >
                    <CheckCircle className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-xs xs:text-sm sm:text-base mb-0.5 drop-shadow-md">
                      {item4Title.displayedText}
                      {!item4Title.isComplete && (
                        <span className="animate-pulse">|</span>
                      )}
                    </div>
                    <div className="text-white/90 text-xs xs:text-xs sm:text-sm leading-relaxed">
                      {item4Desc.displayedText}
                      {!item4Desc.isComplete && (
                        <span className="animate-pulse">|</span>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
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
