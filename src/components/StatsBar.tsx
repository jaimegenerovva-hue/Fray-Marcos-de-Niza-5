import { Move, BedDouble, Bath, Trees } from 'lucide-react';
import { luxuryProperty } from '../data';

export default function StatsBar() {
  const stats = [
    {
      icon: <Move className="w-5 h-5 text-luxury-gold" />,
      value: `${luxuryProperty.buildArea} m²`,
      label: "Construidos"
    },
    {
      icon: <BedDouble className="w-5 h-5 text-luxury-gold" />,
      value: `${luxuryProperty.bedrooms}`,
      label: "Dormitorios"
    },
    {
      icon: <Bath className="w-5 h-5 text-luxury-gold" />,
      value: `${luxuryProperty.bathrooms}`,
      label: "Baños"
    },
    {
      icon: <Trees className="w-5 h-5 text-luxury-gold" />,
      value: `${luxuryProperty.plotArea.toLocaleString('es-ES')} m²`,
      label: "De Parcela"
    }
  ];

  return (
    <section className="bg-luxury-black border-y border-luxury-gold/20 py-8 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y-0 divide-x-0 md:divide-x divide-luxury-gold/10">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left px-4"
            >
              {/* Thin Bordered Square for Icon */}
              <div className="w-12 h-12 rounded-lg border border-luxury-gold/30 flex items-center justify-center bg-luxury-dark/45 shrink-0 shadow-sm">
                {stat.icon}
              </div>
              <div>
                <span className="block text-2xl font-serif font-semibold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-mono font-medium">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
