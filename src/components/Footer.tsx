import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { agencyInfo } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-luxury-black text-gray-400 py-16 border-t border-luxury-gold/15 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Logo & Description Column (Spans 4) */}
          <div className="lg:col-span-4 space-y-6">
            <a 
              href={agencyInfo.mainWeb}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-3 group"
            >
              <div className="bg-white p-1 rounded-md transition-transform group-hover:scale-105 duration-300 w-12">
                <img 
                  src={agencyInfo.logo} 
                  alt={agencyInfo.brand} 
                  className="h-8 w-auto object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="block text-sm uppercase tracking-widest text-luxury-gold font-bold">
                  SUHOGAR
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                  Comprarcasa Sevilla
                </span>
              </div>
            </a>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Especialistas en la compra, venta y comercialización de viviendas exclusivas y residencias de lujo en Sevilla y la comarca del Aljarafe. Ofrecemos una gestión discreta, preferente y de alta sintonía.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: <Facebook className="w-4 h-4" />, url: "https://facebook.com" },
                { icon: <Twitter className="w-4 h-4" />, url: "https://twitter.com" },
                { icon: <Instagram className="w-4 h-4" />, url: "https://instagram.com" },
                { icon: <Linkedin className="w-4 h-4" />, url: "https://linkedin.com" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-luxury-dark hover:bg-luxury-gold border border-white/5 hover:border-luxury-gold flex items-center justify-center text-gray-400 hover:text-luxury-black transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Secciones Column (Spans 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-white border-b border-luxury-gold/20 pb-2">
              Secciones
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: "La Villa", target: "propiedad" },
                { label: "Galería", target: "galeria" },
                { label: "Simulador", target: "hipoteca" },
                { label: "Ubicación", target: "ubicacion" },
                { label: "Contacto", target: "contacto" }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToSection(link.target)}
                    className="hover:text-luxury-gold transition-colors text-left font-sans cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios Column (Spans 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-white border-b border-luxury-gold/20 pb-2">
              Nuestros Servicios
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <a 
                  href={agencyInfo.homeValuationWeb} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Valoración Profesional Gratis
                </a>
              </li>
              <li>
                <a href={agencyInfo.propertiesWeb} target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors">
                  Venta y Comercialización
                </a>
              </li>
              <li>
                <span className="text-gray-500">Asesoramiento Hipotecario Especial</span>
              </li>
              <li>
                <span className="text-gray-500">Marketing Digital de Lujo</span>
              </li>
              <li>
                <span className="text-gray-500">Gestión Integral de Patrimonio</span>
              </li>
            </ul>
          </div>

          {/* Oficina / Contacto Column (Spans 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-white border-b border-luxury-gold/20 pb-2">
              Oficina Central
            </h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span>
                  Calle Chile 104, <br />
                  41930 Bormujos, Sevilla
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
                <a href={`https://wa.me/${agencyInfo.phone}`} target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors">
                  {agencyInfo.phoneFormatted}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
                <a href={`mailto:${agencyInfo.email}`} className="hover:text-luxury-gold transition-colors truncate">
                  {agencyInfo.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal and Bottom Copyright Line */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            &copy; {currentYear} {agencyInfo.brand}. Todos los derechos reservados.
          </div>
          <div className="flex gap-5 flex-wrap justify-center">
            <a href="#aviso-legal" className="hover:text-luxury-gold transition-colors">Aviso Legal</a>
            <a href="#privacidad" className="hover:text-luxury-gold transition-colors">Política de Privacidad</a>
            <a href="#cookies" className="hover:text-luxury-gold transition-colors">Política de Cookies</a>
            <a href="#terminos" className="hover:text-luxury-gold transition-colors">Términos y Condiciones</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
