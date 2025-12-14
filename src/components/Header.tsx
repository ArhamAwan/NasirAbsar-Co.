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
      setIsScrolled(window.scrollY > 100);
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
      "reviews",
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
    { name: "Reviews", href: "/reviews" },
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
      {/* Hero Header - Logo + Floating Nav (Desktop only, when not scrolled) */}
      <AnimatePresence>
        {!isScrolled && (
          <>
            {/* Floating Nav - Centered */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-5 left-0 right-0 z-[60] hidden lg:flex items-center justify-center pointer-events-none"
            >
              {/* Logo in top left - Desktop */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute left-6 flex items-center cursor-pointer pointer-events-auto"
                onClick={(e) => handleNavClick(e, "/")}
              >
                <img
                  src="/logo-small.webp"
                  srcSet="/logo-small.webp 1x, /logo.webp 2x, /logo.png 1x"
                  alt="Nasir Absar & Co."
                  className="h-20 w-20 lg:h-24 lg:w-24 xl:h-28 xl:w-28 object-contain flex-shrink-0"
                  width="112"
                  height="112"
                  loading="eager"
                  fetchPriority="high"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== "/logo.png") {
                      target.src = "/logo.png";
                    }
                  }}
                />
              </motion.div>

              {/* Tagline on right - Desktop */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute right-6 flex items-center pointer-events-auto"
              >
                <p className="text-xs lg:text-[11.5px] xl:text-sm text-white/90 text-right leading-tight font-bold">
                  Auditors, Accountants, Corporate
                  <br />
                  and Tax Consultants
                </p>
              </motion.div>
              <nav
                className="flex items-center gap-2 px-2 py-2 rounded-full pointer-events-auto"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                {navItems.map((item) => {
                  const sectionId =
                    item.href === "/" ? "home" : item.href.slice(1);
                  const isActive = activeSection === sectionId;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                        isActive
                          ? "bg-white text-blue-600 shadow-lg"
                          : "text-white hover:bg-white/20"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.a>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full Header - Visible when scrolled on Desktop */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isScrolled ? 0 : -100,
          opacity: isScrolled ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed top-0 left-0 right-0 z-[60] overflow-x-hidden w-full max-w-full transition-all duration-300 hidden lg:block ${
          isScrolled
            ? "glass-light shadow-xl border-b border-white/20"
            : "bg-transparent pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 w-full max-w-full">
          <div className="relative flex items-center justify-between h-16 sm:h-20 md:h-20 lg:h-24 xl:h-28">
            {/* Logo */}
            <motion.div
              className="flex items-center cursor-pointer z-10"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => handleNavClick(e, "/")}
            >
              <img
                src="/logo-small.webp"
                srcSet="/logo-small.webp 1x, /logo.webp 2x, /logo.png 1x"
                alt="Nasir Absar & Co."
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-28 xl:w-28 object-contain flex-shrink-0"
                width="112"
                height="112"
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== "/logo.png") {
                    target.src = "/logo.png";
                  }
                }}
              />
            </motion.div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
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
                      isActive ? "text-blue-600" : "text-gray-700"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
            </nav>

            {/* Tagline and Contact on Right */}
            <div className="flex items-center space-x-4 z-10">
              <p className="hidden lg:block text-xs lg:text-[11px] xl:text-sm text-gray-600 text-right max-w-xs leading-tight font-bold">
                Auditors, Accountants, Corporate
                <br />
                and Tax Consultants
              </p>
              <motion.a
                href="tel:051-4861322"
                className="hidden lg:flex items-center space-x-2 text-sm text-gray-600"
                whileHover={{ scale: 1.05 }}
              >
                <Phone size={16} />
                <span>051-4861322</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Header - Always visible on mobile */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed top-0 left-0 right-0 z-[60] overflow-x-hidden w-full max-w-full transition-all duration-300 lg:hidden ${
          isScrolled
            ? "glass-light shadow-xl border-b border-white/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 w-full max-w-full">
          <div className="relative flex items-center justify-between h-16 sm:h-20 md:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center cursor-pointer z-10"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => handleNavClick(e, "/")}
            >
              <img
                src="/logo-small.webp"
                srcSet="/logo-small.webp 1x, /logo.webp 2x, /logo.png 1x"
                alt="Nasir Absar & Co."
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-20 md:w-20 object-contain flex-shrink-0"
                width="80"
                height="80"
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== "/logo.png") {
                    target.src = "/logo.png";
                  }
                }}
              />
            </motion.div>

            {/* Tagline on Right - Mobile */}
            <div className="flex-1 flex justify-end items-center pr-2 sm:pr-3">
              <div
                className={`text-[10px] xs:text-[10px] sm:text-xs text-right font-bold leading-tight ${
                  isScrolled ? "text-gray-600" : "text-white/90"
                }`}
              >
                <div className="block">Auditors, Accountants, Corporate</div>
                <div className="block">and Tax Consultants</div>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              type="button"
              className={`p-2 flex-shrink-0 ${
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
                    src="/logo.webp"
                    srcSet="/logo.webp 1x, /logo.png 1x"
                    alt="Nasir Absar & Co."
                    className="h-20 w-20 sm:h-24 sm:w-24 object-contain"
                    width="96"
                    height="96"
                    loading="eager"
                    fetchPriority="high"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== "/logo.png") {
                        target.src = "/logo.png";
                      }
                    }}
                  />
                  <div>
                    <p className="text-xs text-gray-600 drop-shadow-sm leading-tight font-bold">
                      Auditors, Accountants, Corporate
                      <br />
                      and Tax Consultants
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
