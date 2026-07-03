import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Intro from './components/Intro';
import Gallery from './components/Gallery';
import MortgageCalculator from './components/MortgageCalculator';
import InteractiveMap from './components/InteractiveMap';
import LeadCaptureForm from './components/LeadCaptureForm';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { luxuryProperty } from './data';
import { Lead } from './types';
import { Key, Trash2, X, ClipboardCheck, Sparkles, Send } from 'lucide-react';

export default function App() {
  const [isLeadsPanelOpen, setIsLeadsPanelOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);

  // Load leads from localStorage for simulation display
  const loadLeads = () => {
    const savedLeads = JSON.parse(localStorage.getItem('suhogar_leads') || '[]');
    setLeads(savedLeads);
  };

  useEffect(() => {
    loadLeads();
    // Listen for storage changes in case they submit in other session
    const handleStorageChange = () => loadLeads();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const clearLeads = () => {
    if (confirm('¿Desea borrar todos los leads de demostración guardados localmente?')) {
      localStorage.removeItem('suhogar_leads');
      setLeads([]);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-luxury-cream text-luxury-navy font-sans antialiased selection:bg-luxury-gold selection:text-luxury-black">
      
      {/* 1. Header */}
      <Header />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Stats Bar */}
      <StatsBar />

      {/* 4. Intro & Highlights */}
      <motion.div {...fadeInUp}>
        <Intro />
      </motion.div>

      {/* 5. Photo Gallery & Lightbox */}
      <motion.div {...fadeInUp}>
        <Gallery />
      </motion.div>

      {/* 6. Location & Interactive Map (Leaflet) */}
      <motion.section 
        id="ubicacion" 
        className="bg-luxury-sand py-20 md:py-28 scroll-mt-[100px]"
        {...fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-mono font-semibold">
              Ubicación Exclusiva
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight leading-tight">
              Santa Clara: <br />
              <span className="text-luxury-gold italic font-light font-serif">
                Un oasis residencial histórico en Sevilla
              </span>
            </h2>
            <p className="text-sm text-gray-500 font-sans max-w-2xl mx-auto font-light leading-relaxed">
              Disfrute de la máxima privacidad de Santa Clara, una de las zonas residenciales más consolidadas de Sevilla, con excelentes conexiones a servicios exclusivos de la ciudad.
            </p>
          </div>

          {/* Map & List Component */}
          <InteractiveMap 
            nearbyPoints={luxuryProperty.nearbyPoints} 
            propertyCoords={luxuryProperty.coordinates} 
          />

        </div>
      </motion.section>

      {/* 7. Mortgage Calculator */}
      <motion.div {...fadeInUp}>
        <MortgageCalculator />
      </motion.div>

      {/* 8. Captation Form & Agent Info */}
      <motion.div {...fadeInUp}>
        <LeadCaptureForm />
      </motion.div>

      {/* 9. Footer */}
      <motion.div {...fadeInUp}>
        <Footer />
      </motion.div>

      {/* 10. Floating Scroll to Top */}
      <ScrollToTop />

    </div>
  );
}
