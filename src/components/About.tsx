import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Target, Eye } from 'lucide-react';

const About: React.FC = () => {

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white overflow-x-hidden w-full max-w-full">
      <div className="container mx-auto px-4 sm:px-6 w-full max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-2">
            About Nasir Absar & Co.
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Established as a leading accounting firm in Islamabad, we have been providing 
            exceptional financial services for over two decades.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start mb-12 sm:mb-16 md:mb-20">
          {/* Left Column: Our Story Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
            </div>
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Our Story</h3>
            <p className="text-sm xs:text-base text-gray-600 mb-4 sm:mb-5 leading-relaxed">
              Founded with a vision to provide comprehensive and reliable accounting services, 
              Nasir Absar & Co. has grown to become one of the most trusted names in financial 
              consulting in Islamabad.
            </p>
            <p className="text-sm xs:text-base text-gray-600 mb-4 sm:mb-5 leading-relaxed">
              Our firm is strategically located in I-8, serving clients across Pakistan and 
              maintaining a strong reputation for dedication and expertise.
            </p>
            <p className="text-sm xs:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              With a team of qualified Chartered Accountants and financial experts, we have 
              successfully served over 500 clients, ranging from small businesses to large 
              corporations, helping them achieve their financial goals through strategic planning 
              and meticulous execution.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-200">
              <div className="text-center flex-1 min-w-[80px]">
                <div className="text-2xl xs:text-3xl font-bold text-blue-600">25+</div>
                <div className="text-xs xs:text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center flex-1 min-w-[80px]">
                <div className="text-2xl xs:text-3xl font-bold text-blue-600">500+</div>
                <div className="text-xs xs:text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center flex-1 min-w-[80px]">
                <div className="text-2xl xs:text-3xl font-bold text-blue-600">98%</div>
                <div className="text-xs xs:text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Mission and Vision Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 sm:gap-8"
          >
            {/* Our Mission Card */}
            <div className="bg-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl">
              <div className="flex items-start space-x-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <h4 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white">Our Mission</h4>
              </div>
              <p className="text-white text-sm xs:text-base sm:text-lg leading-relaxed">
                To provide exceptional accounting and financial services that empower businesses 
                to make informed decisions, achieve sustainable growth, and maintain financial 
                health through professional expertise and innovative solutions.
              </p>
            </div>

            {/* Our Vision Card */}
            <div className="bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl">
              <div className="flex items-start space-x-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                </div>
                <h4 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white">Our Vision</h4>
              </div>
              <p className="text-white text-sm xs:text-base sm:text-lg leading-relaxed">
                To be the most trusted and preferred accounting firm in Pakistan, known for our 
                integrity, expertise, and commitment to client success in an ever-evolving 
                financial landscape.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;