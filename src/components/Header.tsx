import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X } from 'lucide-react';
import { agencyInfo } from '../data';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-luxury-black/95 backdrop-blur-md py-4 border-b border-luxury-gold/20 shadow-lg'
          : 'bg-gradient-to-b from-luxury-black/80 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Logo and Brand */}
        <a
          href={agencyInfo.mainWeb}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center transition-transform hover:scale-105 duration-300 shrink-0"
        >
          <img
            src="https://es.comprarcasa.pt/Assets/Images/logo-comprarcasa-white@2x.png"
            alt={agencyInfo.brand}
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-10">
          <a
            href="#galeria"
            onClick={(e) => scrollToSection(e, 'galeria')}
            className="text-xs uppercase tracking-widest font-medium text-gray-300 hover:text-luxury-gold transition-colors cursor-pointer"
          >
            Galería
          </a>
          <a
            href="#calculadora-hipoteca"
            onClick={(e) => scrollToSection(e, 'calculadora-hipoteca')}
            className="text-xs uppercase tracking-widest font-medium text-gray-300 hover:text-luxury-gold transition-colors cursor-pointer"
          >
            Calculadora Hipoteca
          </a>
          <a
            href="#ubicacion"
            onClick={(e) => scrollToSection(e, 'ubicacion')}
            className="text-xs uppercase tracking-widest font-medium text-gray-300 hover:text-luxury-gold transition-colors cursor-pointer"
          >
            Ubicación
          </a>
          <a
            href={agencyInfo.homeValuationWeb}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest font-medium text-gray-300 hover:text-luxury-gold transition-colors"
          >
            Valora tu Vivienda
          </a>
        </nav>

        {/* Action Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href={`https://wa.me/${agencyInfo.phone}?text=Hola%20Magdalena,%20deseo%20solicitar%20información%20exclusiva%20sobre%20la%20Villa%20en%20Santa%20Clara.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-luxury-gold hover:bg-luxury-gold-hover text-luxury-black px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-bold transition-all h-10 shadow-md hover:shadow-luxury-gold/20"
          >
            <Phone className="w-3.5 h-3.5 shrink-0 text-luxury-black" />
            WhatsApp Directo
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-luxury-gold hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-luxury-black border-b border-luxury-gold/20 absolute top-full left-0 right-0 py-6 px-4 flex flex-col gap-4 animate-fade-in shadow-2xl">
          <a
            href="#galeria"
            onClick={(e) => scrollToSection(e, 'galeria')}
            className="text-left py-2 text-sm uppercase tracking-widest font-medium text-gray-300 hover:text-luxury-gold transition-colors"
          >
            Galería
          </a>
          <a
            href="#calculadora-hipoteca"
            onClick={(e) => scrollToSection(e, 'calculadora-hipoteca')}
            className="text-left py-2 text-sm uppercase tracking-widest font-medium text-gray-300 hover:text-luxury-gold transition-colors"
          >
            Calculadora Hipoteca
          </a>
          <a
            href="#ubicacion"
            onClick={(e) => scrollToSection(e, 'ubicacion')}
            className="text-left py-2 text-sm uppercase tracking-widest font-medium text-gray-300 hover:text-luxury-gold transition-colors"
          >
            Ubicación
          </a>
          <a
            href={agencyInfo.homeValuationWeb}
            target="_blank"
            rel="noopener noreferrer"
            className="text-left py-2 text-sm uppercase tracking-widest font-medium text-gray-300 hover:text-luxury-gold transition-colors"
          >
            Valora tu Vivienda
          </a>
          <hr className="border-gray-800 my-1" />
          <div className="flex flex-col gap-3 pt-2">
            <a
              href={`https://wa.me/${agencyInfo.phone}?text=Hola%20Magdalena,%20deseo%20solicitar%20información%20exclusiva%20sobre%20la%20Villa%20en%20Santa%20Clara.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-luxury-gold hover:bg-luxury-gold-hover text-luxury-black py-2.5 rounded-lg text-xs uppercase tracking-widest font-bold"
            >
              <Phone className="w-4 h-4 text-luxury-black" /> WhatsApp Directo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
