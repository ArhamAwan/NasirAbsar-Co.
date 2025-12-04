import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Briefcase } from "lucide-react";

const Footer: React.FC = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Team", href: "/team" },
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
    "Accounting",
    "Auditing",
    "Tax Consulting",
    "Financial Planning",
  ];

  return (
    <footer
      className="text-white overflow-x-hidden w-full max-w-full"
      style={{ backgroundColor: "#1A202C" }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16 w-full max-w-full">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {/* Company Info - Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-4 sm:mb-5">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#2563EB" }}
              >
                <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  Nasir Absar & Co.
                </h3>
                <p className="text-xs sm:text-sm text-white/80">
                  Chartered Accountants
                </p>
              </div>
            </div>

            <p className="text-xs xs:text-sm sm:text-base text-white/70 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
              Providing exceptional financial services for over 25 years in
              Islamabad.
            </p>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin
                  className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5"
                  style={{ color: "#EC4899" }}
                />
                <span className="text-xs xs:text-sm sm:text-base text-white/70 break-words">
                  I-8, Islamabad, Pakistan
                </span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone
                  className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                  style={{ color: "#EC4899" }}
                />
                <span className="text-xs xs:text-sm sm:text-base text-white/70">
                  051-4861322
                </span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail
                  className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                  style={{ color: "#EC4899" }}
                />
                <span className="text-xs xs:text-sm sm:text-base text-white/70 break-all">
                  info@nasirabsar.com
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links - Middle Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-4 sm:mb-5 md:mb-6">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xs xs:text-sm sm:text-base text-white/70 hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services - Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-4 sm:mb-5 md:mb-6">
              Our Services
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <motion.span
                    className="text-xs xs:text-sm sm:text-base text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    {service}
                  </motion.span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section - Copyright */}
        <motion.div
          className="border-t border-white/20 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-7 md:pt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-white/70 text-xs xs:text-sm text-center">
            © 2025 Nasir Absar & Co. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
