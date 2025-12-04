import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect for header transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection using scroll position
  useEffect(() => {
    const sections = [
      "home",
      "about",
      "services",
      "team",
      "clients",
      "contact",
    ];

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const headerHeight = 100;
      const viewportHeight = window.innerHeight;

      // Special case: if at the very top, show home
      if (scrollY < 50) {
        setActiveSection("home");
        return;
      }

      // Find which section is most visible in the viewport
      let maxVisible = 0;
      let activeSectionId = "home";

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementBottom = elementTop + rect.height;

        // Calculate how much of the section is visible in the viewport
        const viewportTop = scrollY;
        const viewportBottom = scrollY + viewportHeight;

        const visibleTop = Math.max(elementTop, viewportTop + headerHeight);
        const visibleBottom = Math.min(elementBottom, viewportBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        // Calculate percentage of section visible
        const visibilityRatio = visibleHeight / rect.height;

        // Prioritize sections that are near the top of viewport
        const distanceFromTop = Math.abs(rect.top - headerHeight);
        const score = visibilityRatio * 100 - distanceFromTop * 0.1;

        if (score > maxVisible && rect.top <= viewportHeight * 0.5) {
          maxVisible = score;
          activeSectionId = sectionId;
        }
      });

      // If no section found, check which section the scroll position is in
      if (activeSectionId === "home" && scrollY > 100) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionId = sections[i];
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementBottom = elementTop + rect.height;
            const scrollPosition = scrollY + headerHeight;

            if (
              scrollPosition >= elementTop &&
              scrollPosition < elementBottom
            ) {
              activeSectionId = sectionId;
              break;
            }
          }
        }
      }

      setActiveSection(activeSectionId);
    };

    // Initial check after a delay to ensure DOM is ready
    const initialTimeout = setTimeout(() => {
      updateActiveSection();
    }, 200);

    // Update on scroll
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    // Also update when route changes
    const routeTimeout = setTimeout(() => {
      updateActiveSection();
    }, 300);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(routeTimeout);
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [location.pathname]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (!isMenuOpen) return;

    // Save current scroll position
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll position after a small delay to let React finish updating
      requestAnimationFrame(() => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo({ top: scrollY, behavior: "instant" });
      });
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Team", href: "/team" },
    { name: "Clients", href: "/clients" },
    { name: "Contact", href: "/contact" },
  ];

  const scrollToSection = (path: string) => {
    const sectionId = path === "/" ? "home" : path.slice(1);
    const element = document.getElementById(sectionId);

    if (element) {
      const headerOffset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else if (path === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();

    // 1. Close menu first
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }

    // 2. Update URL
    if (location.pathname !== href) {
      navigate(href);
    }

    // 3. Scroll to section
    // We add a small delay if on mobile to allow the menu to close and body to unlock
    // preventing layout shifts from interfering with scroll
    const delay = isMenuOpen ? 300 : 100;

    setTimeout(() => {
      scrollToSection(href);
    }, delay);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed top-0 left-0 right-0 z-[60] overflow-x-hidden w-full max-w-full transition-all duration-300 ${
          isScrolled
            ? "glass-light shadow-xl border-b border-white/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 w-full max-w-full">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => handleNavClick(e, "/")}
            >
              <img
                src="/logo.png"
                alt="Nasir Absar & Co."
                className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <h1
                  className={`text-sm xs:text-base sm:text-lg md:text-xl font-bold truncate ${
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => {
                const sectionId =
                  item.href === "/" ? "home" : item.href.slice(1);
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`font-medium hover:text-blue-600 transition-colors ${
                      isActive
                        ? "text-blue-600"
                        : isScrolled
                        ? "text-gray-700"
                        : "text-white"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
            </nav>

            {/* Contact & Mobile Toggle */}
            <div className="flex items-center space-x-4">
              <motion.a
                href="tel:051-4861322"
                className={`hidden lg:flex items-center space-x-2 text-sm ${
                  isScrolled ? "text-gray-600" : "text-blue-100"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <Phone size={16} />
                <span>051-4861322</span>
              </motion.a>

              <button
                type="button"
                className={`lg:hidden p-2 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(!isMenuOpen);
                }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
              }}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 w-80 max-w-[85vw] z-[100] lg:hidden flex flex-col shadow-2xl rounded-bl-2xl backdrop-blur-xl border-l border-b border-white/30"
              style={{
                background: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(30px) saturate(100%)",
                WebkitBackdropFilter: "blur(30px) saturate(100%)",
                boxShadow:
                  "0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)",
              }}
            >
              {/* Header with Logo and Close Button */}
              <div
                className="flex items-center justify-between p-4 border-b border-white/20"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src="/logo.png"
                    alt="Nasir Absar & Co."
                    className="h-10 w-10 object-contain"
                  />
                  <div>
                    <h1 className="text-sm font-bold text-gray-900 drop-shadow-sm">
                      Nasir Absar & Co.
                    </h1>
                    <p className="text-xs text-gray-600 drop-shadow-sm">
                      Chartered Accountants
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMenuOpen(false);
                  }}
                  className="w-8 h-8 rounded-lg border-2 border-gray-300 bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white/80 transition-colors flex items-center justify-center flex-shrink-0"
                  aria-label="Close menu"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-4 px-2">
                {navItems.map((item) => {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg mb-1 text-gray-800 hover:bg-white/40"
                      style={{
                        background: "transparent",
                        color: "rgb(31, 41, 55)",
                      }}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
