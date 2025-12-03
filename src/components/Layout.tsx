import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (location.pathname !== '/') {
        // If it's a route like /about, scroll to that section
        const sectionId = location.pathname.slice(1); // Remove leading /
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80; // Account for fixed header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        // If it's home, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="font-inter overflow-x-hidden w-full max-w-full">
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;

