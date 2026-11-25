import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Equipment from './pages/Equipment';
import HSE from './pages/HSE';
import FMCS from './pages/FMCS';
import Contact from './pages/Contact';
import WMS from './pages/WMS';
import TCF from './pages/TCF';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

function AnimatedPageRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-fade-in">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/wms" element={<WMS />} />
        <Route path="/tcf" element={<TCF />} />
        <Route path="/portable-structure" element={<TCF />} />
        <Route path="/hse" element={<HSE />} />
        <Route path="/fmcs" element={<FMCS />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main className="main-clip min-h-screen">
        <AnimatedPageRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}


