import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, ZoomIn } from 'lucide-react';
import { luxuryProperty } from '../data';

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const photos = luxuryProperty.photos;

  // Key bindings for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handlePrev = () => {
    setActiveIdx(prev => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx(prev => (prev + 1) % photos.length);
  };

  const openLightbox = (index: number) => {
    setActiveIdx(index);
    setIsOpen(true);
  };

  return (
    <section id="galeria" className="bg-luxury-black py-20 md:py-28 text-white relative scroll-mt-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-mono font-semibold">
            Inmersión Visual
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight">
            Descubra cada detalle de <br />
            <span className="text-luxury-gold italic font-light font-serif">
              su futuro hogar
            </span>
          </h2>
          <p className="text-sm text-gray-400 font-sans max-w-2xl mx-auto font-light leading-relaxed">
            Un recorrido fotográfico exclusivo por los interiores sofisticados, jardines paisajísticos y la arquitectura de autor de esta emblemática propiedad.
          </p>
        </div>

        {/* Gallery Grid - Responsive & Custom structured for 4 columns x 2 rows on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-auto lg:h-[520px]">
          
          {/* Main Large Image (Photo 0) - Spans 2x2 */}
          <div 
            onClick={() => openLightbox(0)}
            className="sm:col-span-2 sm:row-span-2 group overflow-hidden rounded-2xl border border-luxury-gold/10 hover:border-luxury-gold/50 transition-all duration-300 relative cursor-zoom-in h-[280px] sm:h-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
            <img 
              src={photos[0].url} 
              alt={photos[0].caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Hover Caption */}
            <div className="absolute bottom-4 left-4 right-4 z-20 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-[9px] font-mono uppercase tracking-widest text-luxury-gold font-bold">Exterior</span>
              <p className="text-xs font-medium text-white tracking-wide mt-0.5">{photos[0].caption}</p>
            </div>
            {/* Zoom Icon overlay */}
            <div className="absolute top-4 right-4 z-20 bg-luxury-black/60 p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all">
              <ZoomIn className="w-4 h-4 text-luxury-gold" />
            </div>
          </div>

          {/* Photo 1 */}
          <div 
            onClick={() => openLightbox(1)}
            className="group overflow-hidden rounded-2xl border border-luxury-gold/10 hover:border-luxury-gold/50 transition-all duration-300 relative cursor-zoom-in h-[200px] lg:h-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent z-10 opacity-60" />
            <img 
              src={photos[1].url} 
              alt={photos[1].caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-[9px] font-mono uppercase tracking-widest text-luxury-gold font-bold">Porche</span>
              <p className="text-xs font-medium text-white tracking-wide mt-0.5 truncate">{photos[1].caption}</p>
            </div>
          </div>

          {/* Photo 2 */}
          <div 
            onClick={() => openLightbox(2)}
            className="group overflow-hidden rounded-2xl border border-luxury-gold/10 hover:border-luxury-gold/50 transition-all duration-300 relative cursor-zoom-in h-[200px] lg:h-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent z-10 opacity-60" />
            <img 
              src={photos[2].url} 
              alt={photos[2].caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-[9px] font-mono uppercase tracking-widest text-luxury-gold font-bold">Piscina</span>
              <p className="text-xs font-medium text-white tracking-wide mt-0.5 truncate">{photos[2].caption}</p>
            </div>
          </div>

          {/* Photo 3 */}
          <div 
            onClick={() => openLightbox(3)}
            className="group overflow-hidden rounded-2xl border border-luxury-gold/10 hover:border-luxury-gold/50 transition-all duration-300 relative cursor-zoom-in h-[200px] lg:h-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent z-10 opacity-60" />
            <img 
              src={photos[3].url} 
              alt={photos[3].caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-[9px] font-mono uppercase tracking-widest text-luxury-gold font-bold">Jardín</span>
              <p className="text-xs font-medium text-white tracking-wide mt-0.5 truncate">{photos[3].caption}</p>
            </div>
          </div>

          {/* Photo 4 - Displays with overlay "VER MÁS +" and holds count of total photos */}
          <div 
            onClick={() => openLightbox(4)}
            className="group overflow-hidden rounded-2xl border border-luxury-gold/50 transition-all duration-300 relative cursor-pointer h-[200px] lg:h-auto"
          >
            {/* Blurry dark overlay */}
            <div className="absolute inset-0 bg-luxury-black/75 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center border-2 border-dashed border-luxury-gold/40 group-hover:border-luxury-gold transition-colors" />
            <img 
              src={photos[3].url} 
              alt={photos[3].caption}
              className="w-full h-full object-cover absolute inset-0"
              referrerPolicy="no-referrer"
            />
            {/* Plus indicator content */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-4">
              <span className="text-3xl sm:text-4xl font-serif font-light text-luxury-gold tracking-widest">
                +{photos.length - 4}
              </span>
              <span className="text-xs uppercase tracking-widest text-white font-medium mt-1">
                Ver Más Fotos
              </span>
              <span className="text-[10px] text-gray-400 font-mono mt-1 font-light tracking-wider uppercase">
                Galería Completa
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-luxury-black/98 backdrop-blur-md z-50 flex flex-col justify-between p-4 md:p-8 animate-fade-in">
          
          {/* Header */}
          <div className="flex items-center justify-between w-full border-b border-white/10 pb-4">
            <div className="text-left">
              <span className="text-[9px] font-mono uppercase tracking-widest text-luxury-gold font-semibold">
                Galería Exclusiva · {luxuryProperty.title}
              </span>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Imagen {activeIdx + 1} de {photos.length}
              </h3>
            </div>
            
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-luxury-gold p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all cursor-pointer border border-white/10"
              aria-label="Cerrar galería"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image Stage */}
          <div className="flex-1 flex items-center justify-center relative my-4">
            {/* Prev Arrow */}
            <button 
              onClick={handlePrev}
              className="absolute left-2 md:left-6 z-10 bg-luxury-dark/60 hover:bg-luxury-gold text-white hover:text-luxury-black p-3.5 rounded-full border border-white/10 hover:border-luxury-gold/50 transition-all cursor-pointer backdrop-blur-sm"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Image Wrap */}
            <div className="max-w-4xl max-h-[60vh] md:max-h-[70vh] flex flex-col items-center justify-center select-none animate-scale-up">
              <img 
                src={photos[activeIdx].url} 
                alt={photos[activeIdx].caption}
                className="max-w-full max-h-[55vh] md:max-h-[65vh] object-contain rounded-lg border border-luxury-gold/20 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <p className="text-center text-sm text-gray-300 mt-4 max-w-2xl font-light tracking-wide italic">
                “{photos[activeIdx].caption}”
              </p>
            </div>

            {/* Next Arrow */}
            <button 
              onClick={handleNext}
              className="absolute right-2 md:right-6 z-10 bg-luxury-dark/60 hover:bg-luxury-gold text-white hover:text-luxury-black p-3.5 rounded-full border border-white/10 hover:border-luxury-gold/50 transition-all cursor-pointer backdrop-blur-sm"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Footer Thumbnails Navigation */}
          <div className="border-t border-white/10 pt-4 pb-2 w-full max-w-4xl mx-auto">
            <div className="flex justify-center gap-2 overflow-x-auto py-1 no-scrollbar">
              {photos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-14 sm:w-20 h-10 sm:h-14 rounded-md overflow-hidden border shrink-0 transition-all ${
                    idx === activeIdx 
                      ? 'border-luxury-gold scale-105 ring-2 ring-luxury-gold/20' 
                      : 'border-white/10 opacity-45 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={photo.url} 
                    alt={photo.caption} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

    </section>
  );
}
