import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check initial scroll position
    setIsScrolled(window.scrollY > 50);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Team", href: "/team" },
    { name: "Clients", href: "/clients" },
    { name: "Contact", href: "/contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href === "/") {
      window.location.href = "/";
    } else {
      // Navigate to route, then scroll to section
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

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={`fixed top-0 left-0 right-0 z-50 overflow-x-hidden w-full max-w-full ${
        isScrolled
          ? "glass-light shadow-xl border-b border-white/20"
          : "bg-transparent"
      }`}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="container mx-auto px-4 w-full max-w-full">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <img
              src="/logo.png"
              alt="Nasir Absar & Co."
              className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain flex-shrink-0"
              width="80"
              height="80"
              loading="eager"
              style={{ willChange: "transform" }}
            />
            <div className="hidden sm:block min-w-0">
              <h1
                className={`text-base sm:text-lg md:text-xl font-bold truncate ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Nasir Absar & Co.
              </h1>
              <p
                className={`text-xs sm:text-sm truncate ${
                  isScrolled ? "text-gray-600" : "text-blue-100"
                }`}
              >
                Chartered Accountants
              </p>
            </div>
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-medium hover:text-blue-600 ${
                  isScrolled ? "text-gray-700" : "text-white"
                } ${
                  location.pathname === item.href ||
                  (item.href === "/" && location.pathname === "/")
                    ? "text-blue-600"
                    : ""
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{ willChange: "transform" }}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <motion.a
              href="tel:+92-51-1234567"
              className={`flex items-center space-x-2 text-sm ${
                isScrolled ? "text-gray-600" : "text-blue-100"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <Phone size={16} />
              <span>+92-51-1234567</span>
            </motion.a>
          </div>

          <button
            className={`lg:hidden p-2 ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-light border-t border-white/30 backdrop-blur-xl mt-2 rounded-b-2xl"
          >
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setIsMenuOpen(false);
                  }}
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-white/50 rounded-lg mx-2 transition-all duration-300 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
