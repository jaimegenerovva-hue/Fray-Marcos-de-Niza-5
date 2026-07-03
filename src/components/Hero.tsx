import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Compass, Calendar } from 'lucide-react';

const heroPhotos = [
  {
    url: "https://res.cloudinary.com/dbaan8ofb/image/upload/v1782990555/ChatGPT_Image_2_jul_2026_12_59_56_gxe6ot.png",
    caption: "Fachada Principal y Jardines"
  },
  {
    url: "https://res.cloudinary.com/dbaan8ofb/image/upload/v1782990550/ChatGPT_Image_2_jul_2026_12_13_07_tbo72o.png",
    caption: "Piscina Privada y Porche"
  },
  {
    url: "https://res.cloudinary.com/dbaan8ofb/image/upload/v1782990554/ChatGPT_Image_2_jul_2026_12_48_43_lzsecc.png",
    caption: "Salón Señorial con Chimenea"
  },
  {
    url: "https://res.cloudinary.com/dbaan8ofb/image/upload/v1782990553/ChatGPT_Image_2_jul_2026_12_31_24_ka7dsa.png",
    caption: "Suite Principal de Gran Amplitud"
  }
];

function getCloudinarySrcSet(baseUrl: string) {
  const uploadIndex = baseUrl.indexOf('/upload/');
  if (uploadIndex === -1) return undefined;
  
  const prefix = baseUrl.substring(0, uploadIndex + 8);
  const suffix = baseUrl.substring(uploadIndex + 8);
  
  const widths = [1024, 1440, 1920, 2560];
  return widths
    .map(w => `${prefix}w_${w},c_limit,f_auto,q_auto:best/${suffix} ${w}w`)
    .join(', ');
}

function getCloudinarySrc(baseUrl: string) {
  const uploadIndex = baseUrl.indexOf('/upload/');
  if (uploadIndex === -1) return baseUrl;
  
  const prefix = baseUrl.substring(0, uploadIndex + 8);
  const suffix = baseUrl.substring(uploadIndex + 8);
  
  return `${prefix}f_auto,q_auto:best/${suffix}`;
}

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % heroPhotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIdx(prev => (prev === 0 ? heroPhotos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx(prev => (prev + 1) % heroPhotos.length);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-luxury-black">
      {/* Photo Carousel Container */}
      {heroPhotos.map((photo, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-out transform ${
            index === currentIdx 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          {/* Premium Elegant Gradient Overlay: dark on the left for text legibility, beautifully transparent on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/85 via-luxury-black/45 to-luxury-black/10 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/50 via-transparent to-luxury-black/15 z-10" />
          
          <img
            src={getCloudinarySrc(photo.url)}
            srcSet={getCloudinarySrcSet(photo.url)}
            sizes="100vw"
            alt={photo.caption}
            className="w-full h-full object-cover animate-none"
            referrerPolicy="no-referrer"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Content Container */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Elegant Small Caps Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-luxury-gold/10 backdrop-blur-md border border-luxury-gold/30 px-3 py-1.5 rounded-full mb-6 animate-fade-in-down">
              <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono">
                UBICACIÓN EXCLUSIVA · SANTA CLARA
              </span>
            </div>

            {/* Title with Serif elegant layout */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight mb-6">
              Tradición y señorío familiar <br />
              <span className="text-luxury-gold italic font-light font-serif">
                bajo la luz de Sevilla
              </span>
            </h1>

            {/* Elegant Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 font-sans tracking-wide leading-relaxed mb-8 max-w-2xl font-light">
              Una villa clásica sevillana donde la tradición y la luz del sur se dan la mano, en uno de los enclaves más codiciados de Santa Clara.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                onClick={() => scrollToSection('propiedad')}
                className="flex items-center justify-center gap-2 bg-luxury-gold hover:bg-luxury-gold-hover text-luxury-black font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-luxury-gold/30 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                Explorar la Villa
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 border border-white/30 hover:border-white text-white px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-luxury-gold" />
                Agenda una Visita
              </button>

              {/* Elegant Price Badge */}
              <div className="inline-flex items-center gap-2 bg-luxury-black/60 backdrop-blur-md border border-luxury-gold/30 px-4 py-3.5 rounded-xl animate-fade-in-up self-start sm:self-auto sm:ml-2">
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold font-mono">
                  PRECIO:
                </span>
                <span className="text-sm font-sans font-semibold text-white tracking-wider">
                  1.145.000 €
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Slide Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-luxury-black/35 hover:bg-luxury-gold/20 text-white hover:text-luxury-gold p-3 rounded-full border border-white/10 hover:border-luxury-gold/50 transition-all cursor-pointer backdrop-blur-sm hidden sm:flex"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-luxury-black/35 hover:bg-luxury-gold/20 text-white hover:text-luxury-gold p-3 rounded-full border border-white/10 hover:border-luxury-gold/50 transition-all cursor-pointer backdrop-blur-sm hidden sm:flex"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Pagination Dots & Captions */}
      <div className="absolute bottom-10 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Caption of current image */}
          <div className="text-gray-400 text-xs tracking-wider uppercase font-mono max-w-sm text-center sm:text-left">
            <span className="text-luxury-gold font-semibold">ESPACIO: </span>
            {heroPhotos[currentIdx].caption}
          </div>

          {/* Dots */}
          <div className="flex gap-2.5">
            {heroPhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIdx(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIdx 
                    ? 'w-8 bg-luxury-gold' 
                    : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
