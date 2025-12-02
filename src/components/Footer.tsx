import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin,
  ArrowUp
} from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Team', href: '#team' },
    { name: 'Clients', href: '#clients' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Transaction Advisory',
    'Corporate Law',
    'Audit & Assurance',
    'Tax Services',
    'Business Consulting',
    'IP Registration'
  ];

  return (
    <footer className="glass-dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-t border-white/10 overflow-x-hidden w-full max-w-full">
      <div className="container mx-auto px-4 py-16 w-full max-w-full">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/image.png" 
                alt="Nasir Absar & Co." 
                className="h-12 w-auto"
              />
              <div>
                <h3 className="text-2xl font-bold">Nasir Absar & Co.</h3>
                <p className="text-blue-300">Chartered Accountants</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              With over 25 years of experience, Nasir Absar & Co. is a leading accounting firm 
              in Islamabad, providing comprehensive financial services to businesses across Pakistan. 
              Our commitment to excellence and integrity has made us a trusted partner for over 200 prestigious clients.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">I-8 Markaz, Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">+92-51-1234567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">info@nasirabsar.com</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <motion.span
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    {service}
                  </motion.span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Nasir Absar & Co. All rights reserved. | Privacy Policy | Terms of Service
          </div>
          
          <div className="flex items-center space-x-6">
            <motion.a
              href="https://pk.linkedin.com/company/nasir-absar-co"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 glass-light bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-600/80 transition-all duration-300 backdrop-blur-md border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} />
            </motion.a>
            
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 glass-button rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;