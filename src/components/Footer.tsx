import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Team", href: "/team" },
    { name: "Clients", href: "/clients" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href === "/") {
      window.location.href = "/";
    } else {
      window.history.pushState({}, "", href);
      const sectionId = href.slice(1);
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  };

  const services = [
    "Transaction Advisory",
    "Corporate Law",
    "Audit & Assurance",
    "Tax Services",
    "Business Consulting",
    "IP Registration",
  ];

  return (
    <footer className="glass-dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-t border-white/10 overflow-x-hidden w-full max-w-full">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16 w-full max-w-full">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="sm:col-span-2"
          >
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-5 md:mb-6">
              <img
                src="/logo.png"
                alt="Nasir Absar & Co."
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.error("Footer logo failed to load:", target.src);
                }}
              />
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                  Nasir Absar & Co.
                </h3>
                <p className="text-xs sm:text-sm text-blue-300">
                  Chartered Accountants
                </p>
              </div>
            </div>

            <p className="text-xs xs:text-sm sm:text-base text-gray-300 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
              With over 25 years of experience, Nasir Absar & Co. is a leading
              accounting firm in Islamabad, providing comprehensive financial
              services to businesses across Pakistan. Our commitment to
              excellence and integrity has made us a trusted partner for over
              200 prestigious clients.
            </p>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start sm:items-center space-x-2 sm:space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                <span className="text-xs xs:text-sm sm:text-base text-gray-300 break-words">
                  I-8 Markaz, Islamabad, Pakistan
                </span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <span className="text-xs xs:text-sm sm:text-base text-gray-300">
                  +92-51-1234567
                </span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <span className="text-xs xs:text-sm sm:text-base text-gray-300 break-all">
                  info@nasirabsar.com
                </span>
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
            <h4 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 md:mb-6">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xs xs:text-sm sm:text-base text-gray-300 hover:text-blue-400 transition-colors duration-300"
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
            <h4 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 md:mb-6">
              Our Services
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <motion.span
                    className="text-xs xs:text-sm sm:text-base text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
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
          className="border-t border-white/10 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-7 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-gray-400 text-xs xs:text-sm text-center md:text-left w-full">
            © 2025 Nasir Absar & Co. All rights reserved. | Privacy Policy |
            Terms of Service
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
