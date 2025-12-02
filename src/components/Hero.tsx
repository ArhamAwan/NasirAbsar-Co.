import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, TrendingUp } from 'lucide-react';

const AnimatedSphere: React.FC = () => {
  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          color="#3B82F6"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0}
        />
      </Sphere>
    </Float>
  );
};

const Hero: React.FC = () => {
  const stats = [
    { icon: Award, value: '25+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Satisfied Clients' },
    { icon: TrendingUp, value: '98%', label: 'Success Rate' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-x-hidden w-full max-w-full">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900" />
      
      {/* Three.js Background */}
      <div className="absolute inset-0 opacity-30" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} enableDamping dampingFactor={0.05} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full max-w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 100, duration: 0.8 }}
            className="text-white"
            style={{ willChange: 'transform, opacity' }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 25, stiffness: 100, duration: 0.8 }}
              style={{ willChange: 'transform, opacity' }}
            >
              Excellence in
              <span className="text-blue-300 block">Financial Services</span>
            </motion.h1>
            
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", damping: 25, stiffness: 100, duration: 0.8 }}
              style={{ willChange: 'transform, opacity' }}
            >
              Nasir Absar & Co. provides comprehensive accounting, auditing, and financial consulting services in Islamabad with over 25 years of trusted expertise.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring", damping: 25, stiffness: 100, duration: 0.8 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <motion.button
                className="glass-button text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm sm:text-base w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{ willChange: 'transform' }}
              >
                <span>Get Consultation</span>
                <ArrowRight size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
              
              <motion.button
                className="glass border-2 border-white/30 text-white hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold backdrop-blur-md text-sm sm:text-base w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{ willChange: 'transform' }}
              >
                Our Services
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-2 sm:gap-4 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, type: "spring", damping: 25, stiffness: 100, duration: 0.8 }}
              style={{ willChange: 'transform, opacity' }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass text-center p-2 sm:p-4 rounded-xl border border-white/20 backdrop-blur-md min-w-0"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  style={{ willChange: 'transform' }}
                >
                  <stat.icon className="w-5 h-5 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-blue-300 flex-shrink-0" />
                  <div className="text-lg sm:text-2xl font-bold text-white truncate">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-blue-200 line-clamp-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-full mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 100, duration: 0.8, delay: 0.3 }}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative z-10 glass-light rounded-2xl p-5 sm:p-6 border border-white/40 shadow-2xl backdrop-blur-xl w-full max-w-lg mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 text-center">Why Choose Us?</h3>
              <ul className="space-y-2.5 sm:space-y-3 text-gray-700">
                <li className="flex items-center space-x-3 sm:space-x-3.5">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="font-medium text-sm sm:text-base">Certified Chartered Accountants</span>
                </li>
                <li className="flex items-center space-x-3 sm:space-x-3.5">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="font-medium text-sm sm:text-base">25+ Years of Industry Experience</span>
                </li>
                <li className="flex items-center space-x-3 sm:space-x-3.5">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="font-medium text-sm sm:text-base">Located in I-8, Islamabad</span>
                </li>
                <li className="flex items-center space-x-3 sm:space-x-3.5">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="font-medium text-sm sm:text-base">Comprehensive Financial Solutions</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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