import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="font-inter overflow-x-hidden w-full max-w-full">
      <Header />
      <Hero />
      <About />
      <Services />
      <Team />
      <Clients />
      <Contact />
      <Footer />
      <ScrollToTop />
      <Analytics />
    </div>
  );
}

export default App;