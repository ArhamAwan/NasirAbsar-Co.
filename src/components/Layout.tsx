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
    // Only handle initial load or direct URL access
    const sectionId = location.pathname === '/' ? 'home' : location.pathname.slice(1);
    
    // Check if we just navigated (don't scroll if we're already handling it in Header)
    // But actually, simpler is better: let's just check if hash matches or path matches
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (location.pathname === '/') {
        // Only scroll to top if we are strictly at root and NOT hash
        if (!location.hash) {
           window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Only run when pathname changes

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
