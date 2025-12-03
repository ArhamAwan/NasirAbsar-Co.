import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Eye, Heart } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest standards in all our professional services.'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Accurate and detailed financial solutions tailored to your needs.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Clear communication and honest advice in all our dealings.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Ethical practices and trustworthy relationships with our clients.'
    }
  ];

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

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Our Story</h3>
            <p className="text-sm xs:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              Founded with a vision to provide comprehensive and reliable accounting services, 
              Nasir Absar & Co. has grown to become one of the most trusted names in financial 
              consulting in Islamabad. Our firm is strategically located in I-8, serving clients 
              across Pakistan with dedication and expertise.
            </p>
            <p className="text-sm xs:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              With a team of qualified Chartered Accountants and financial experts, we have 
              successfully served over 500 clients, ranging from small businesses to large 
              corporations, helping them achieve their financial goals through strategic planning 
              and meticulous execution.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="text-center flex-1 min-w-[80px]">
                <div className="text-2xl xs:text-3xl font-bold text-blue-600">25+</div>
                <div className="text-xs xs:text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="text-center flex-1 min-w-[80px]">
                <div className="text-2xl xs:text-3xl font-bold text-blue-600">500+</div>
                <div className="text-xs xs:text-sm text-gray-500">Happy Clients</div>
              </div>
              <div className="text-center flex-1 min-w-[80px]">
                <div className="text-2xl xs:text-3xl font-bold text-blue-600">98%</div>
                <div className="text-xs xs:text-sm text-gray-500">Success Rate</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-gray-900 border border-blue-100/50 shadow-2xl">
              <h4 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">Our Mission</h4>
              <p className="mb-6 sm:mb-8 leading-relaxed text-gray-700 text-sm xs:text-base sm:text-lg">
                To provide exceptional accounting and financial services that empower businesses 
                to make informed decisions, achieve sustainable growth, and maintain financial 
                health through professional expertise and innovative solutions.
              </p>
              <h4 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">Our Vision</h4>
              <p className="leading-relaxed text-gray-700 text-sm xs:text-base sm:text-lg">
                To be the most trusted and preferred accounting firm in Pakistan, known for our 
                integrity, expertise, and commitment to client success in an ever-evolving 
                financial landscape.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-10 md:mb-12">Our Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border border-white/50"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg">
                  <value.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{value.title}</h4>
                <p className="text-sm xs:text-base text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;