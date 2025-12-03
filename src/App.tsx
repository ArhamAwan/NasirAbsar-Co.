import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Clients from './components/Clients';
import Contact from './components/Contact';

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Team />
      <Clients />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/about" element={<Layout><HomePage /></Layout>} />
        <Route path="/services" element={<Layout><HomePage /></Layout>} />
        <Route path="/team" element={<Layout><HomePage /></Layout>} />
        <Route path="/clients" element={<Layout><HomePage /></Layout>} />
        <Route path="/contact" element={<Layout><HomePage /></Layout>} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;