import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Sparkles, 
  BookOpen, 
  TreePine, 
  Waves, 
  Car,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const introImages = [
  "https://res.cloudinary.com/dbaan8ofb/image/upload/f_auto,q_auto:best/v1782990550/ChatGPT_Image_2_jul_2026_12_13_07_tbo72o.png",
  "https://res.cloudinary.com/dbaan8ofb/image/upload/f_auto,q_auto:best/v1782990550/ChatGPT_Image_2_jul_2026_12_15_08_kxc8lz.png",
  "https://res.cloudinary.com/dbaan8ofb/image/upload/f_auto,q_auto:best/v1782990553/ChatGPT_Image_2_jul_2026_12_31_24_ka7dsa.png"
];

const highlights = [
  {
    icon: <Home className="w-5 h-5 text-luxury-gold" />,
    title: "ARQUITECTURA SEÑORIAL",
    description: "Muros encalados y cubierta de teja árabe, con un salón comedor presidido por una chimenea clásica."
  },
  {
    icon: <Sparkles className="w-5 h-5 text-luxury-gold" />,
    title: "SUITE PRINCIPAL",
    description: "Dormitorio principal con baño en suite y amplio vestidor, en la planta superior."
  },
  {
    icon: <BookOpen className="w-5 h-5 text-luxury-gold" />,
    title: "BIBLIOTECA Y ESPACIOS VERSÁTILES",
    description: "Salita adaptable a dormitorio adicional y una segunda estancia habilitada como biblioteca."
  },
  {
    icon: <TreePine className="w-5 h-5 text-luxury-gold" />,
    title: "JARDÍN Y PORCHE",
    description: "Jardín arbolado con porche cubierto y zona de barbacoa para el disfrute exterior."
  },
  {
    icon: <Waves className="w-5 h-5 text-luxury-gold" />,
    title: "PISCINA PRIVADA",
    description: "Piscina integrada en el jardín, pensada para disfrutar con total privacidad."
  },
  {
    icon: <Car className="w-5 h-5 text-luxury-gold" />,
    title: "GARAJE Y TRASTERO",
    description: "Plaza de garaje privada incluida y trastero adicional para almacenaje."
  }
];

export default function Intro() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? introImages.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === introImages.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? introImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === introImages.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <section id="propiedad" className="bg-luxury-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Story / Description */}
          <div className="lg:col-span-5 space-y-6">
            {/* Eyebrow */}
            <span className="block text-[11px] font-mono tracking-widest text-luxury-gold uppercase font-semibold">
              UBICACIÓN EXCLUSIVA · SANTA CLARA
            </span>
            
            {/* Title with Serif elegant layout and italicized golden keyword */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-luxury-navy tracking-tight leading-tight">
              Una oda al espacio, <br />
              <span className="text-luxury-gold italic font-light font-serif">
                la privacidad y el señorío
              </span>
            </h2>

            {/* Decorative Vertical Line */}
            <div className="flex gap-4">
              <div className="w-1 bg-luxury-gold shrink-0 rounded-full" />
              <p className="text-base text-luxury-navy/80 font-serif leading-relaxed italic">
                “Cada rincón de esta magnífica villa ha sido proyectado para potenciar la luz natural de Sevilla y el disfrute en total intimidad familiar.”
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm text-gray-600 font-sans leading-relaxed">
              <p>
                Esta distinguida propiedad se emplaza en la cotizada zona residencial de Santa Clara, un enclave de absoluta intimidad y comodidad inmejorable, a un paso de prestigiosos colegios, selectas áreas comerciales y con conexión directa a Santa Justa y al aeropuerto. Su arquitectura clásica, de muros encalados y cubierta de teja árabe, rinde homenaje a las grandes casas solariegas andaluzas, con un majestuoso salón comedor presidido por una chimenea de época como corazón del hogar.
              </p>
              <p>
                La vivienda se distribuye de forma inteligente en dos plantas: la baja acoge una cocina equipada, biblioteca y salita multifuncional, mientras la superior alberga el dormitorio principal en suite con amplio vestidor y estancias adicionales. En el exterior, un porche acristalado se abre a un jardín arbolado con piscina privada y zona de barbacoa, un santuario listo para albergar su nueva historia sin renunciar a las ventajas de vivir en Sevilla.
              </p>
            </div>
          </div>
 
          {/* Right Column - Highlight Grid and Diagonal Photos */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 md:p-10 rounded-2xl border border-gray-100 shadow-xl space-y-8">
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase font-semibold mb-2">
                  Especificaciones Premium
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-luxury-navy">
                  Características Destacadas
                </h3>
              </div>
  
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {highlights.map((highlight, idx) => (
                  <div 
                    key={idx} 
                    className="flex gap-4 items-start group hover:translate-y-[-2px] transition-transform duration-300"
                  >
                    {/* Icon Frame in thin border square */}
                    <div className="w-10 h-10 rounded-lg border border-luxury-gold/30 bg-luxury-cream flex items-center justify-center shrink-0 group-hover:bg-luxury-navy transition-colors">
                      {highlight.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm uppercase tracking-wide font-semibold text-luxury-navy font-sans group-hover:text-luxury-gold transition-colors">
                        {highlight.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Elegant 3-Image Horizontal Display */}
            <div className="pt-6 pb-2 overflow-visible">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 overflow-visible">
                {/* Image 1: Frame A (Arch on top), Horizontal Format, Shadow */}
                <div 
                  onClick={() => openLightbox(0)}
                  className="transition-transform duration-300 hover:scale-105 shrink-0 cursor-zoom-in"
                >
                  <img 
                    src={introImages[0]}
                    alt="Detalle de la propiedad 1"
                    loading="lazy"
                    className="w-[180px] h-[120px] object-cover rounded-t-[60px] rounded-b-[8px] shadow-md border border-white/40"
                  />
                </div>

                {/* Image 2: Frame B (Arch on bottom), Horizontal Format, Shadow */}
                <div 
                  onClick={() => openLightbox(1)}
                  className="transition-transform duration-300 hover:scale-105 shrink-0 cursor-zoom-in"
                >
                  <img 
                    src={introImages[1]}
                    alt="Detalle de la propiedad 2"
                    loading="lazy"
                    className="w-[180px] h-[120px] object-cover rounded-b-[60px] rounded-t-[8px] shadow-md border border-white/40"
                  />
                </div>

                {/* Image 3: Frame A (Arch on top), Horizontal Format, Shadow */}
                <div 
                  onClick={() => openLightbox(2)}
                  className="transition-transform duration-300 hover:scale-105 shrink-0 cursor-zoom-in"
                >
                  <img 
                    src={introImages[2]}
                    alt="Detalle de la propiedad 3"
                    loading="lazy"
                    className="w-[180px] h-[120px] object-cover rounded-t-[60px] rounded-b-[8px] shadow-md border border-white/40"
                  />
                </div>
              </div>
            </div>
          </div>
 
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 border border-white/10 cursor-pointer z-50"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-40">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 border border-white/10 cursor-pointer pointer-events-auto"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 border border-white/10 cursor-pointer pointer-events-auto"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Active Image Container */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] flex flex-col items-center justify-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            >
              <img
                src={introImages[currentIndex]}
                alt={`Imagen ${currentIndex + 1} ampliada`}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />
              
              {/* Image Counter Indicator */}
              <div className="mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-white/60">
                {currentIndex + 1} / {introImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
