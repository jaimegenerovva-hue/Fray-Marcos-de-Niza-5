import React, { useState } from 'react';
import { Mail, Phone, ShieldCheck, UserCheck, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { agencyInfo } from '../data';
import { Lead } from '../types';

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    rgpdConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!formData.name || !formData.lastName || !formData.email || !formData.phone) {
      setErrorMsg('Por favor, rellene todos los campos obligatorios.');
      return;
    }
    if (!formData.rgpdConsent) {
      setErrorMsg('Debe aceptar la política de privacidad y consentimiento RGPD para continuar.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newLead: Lead = {
        id: "lead-" + Math.random().toString(36).substring(2, 9),
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        createdAt: new Date().toISOString(),
        propertyId: "villa-aljarafe-simon-verde"
      };

      // WEBHOOK INTEGRATION POINT:
      // Here you can connect this form to an external CRM, Zapier, Make, or custom API route.
      // Example payload structure:
      /*
      await fetch('https://your-crm-webhook-url.com/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      });
      */
      console.log("Lead captured successfully in simulation:", newLead);

      // Save lead to localStorage for user testing / review
      const currentLeads = JSON.parse(localStorage.getItem('suhogar_leads') || '[]');
      currentLeads.push(newLead);
      localStorage.setItem('suhogar_leads', JSON.stringify(currentLeads));

      setSubmitSuccess(true);
      setFormData({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        rgpdConsent: false
      });
    } catch (err) {
      setErrorMsg('Ocurrió un error al enviar el formulario. Inténtelo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="bg-luxury-navy py-20 md:py-28 text-white relative">
      {/* Decorative vector grid backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-luxury-dark/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Capture Form */}
          <div className="lg:col-span-7 bg-luxury-black/50 p-6 sm:p-10 rounded-2xl border border-luxury-gold/20 shadow-2xl space-y-8">
            <div className="space-y-3">
              <span className="block text-[11px] font-mono tracking-widest text-luxury-gold uppercase font-semibold">
                Trato Preferente
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                Solicitar Información Exclusiva
              </h2>
              <p className="text-xs text-gray-400 font-sans max-w-lg leading-relaxed">
                Rellene sus datos privados y la asesora Magdalena se pondrá en contacto con usted de manera discreta para coordinar una videollamada o visita presencial privada.
              </p>
            </div>

            {submitSuccess ? (
              <div className="bg-luxury-dark/80 border border-luxury-gold/50 p-8 rounded-xl text-center space-y-4 animate-scale-up">
                <div className="w-16 h-16 rounded-full bg-luxury-gold/10 border border-luxury-gold flex items-center justify-center text-luxury-gold mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-white">
                  Solicitud Recibida con Éxito
                </h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Gracias por su interés. Magdalena procesará su solicitud de forma estrictamente privada y le contactará en un plazo de menos de 2 horas.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 text-xs font-mono uppercase tracking-widest text-luxury-gold hover:text-white transition-colors border-b border-luxury-gold/40 hover:border-white pb-0.5"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="bg-red-500/15 border border-red-500/40 text-red-200 p-4 rounded-lg text-xs leading-relaxed">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nombre */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ej. Carlos"
                      className="w-full bg-luxury-dark border border-white/10 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all"
                      required
                    />
                  </div>

                  {/* Apellidos */}
                  <div className="space-y-1.5">
                    <label htmlFor="lastName" className="block text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Ej. Mendoza"
                      className="w-full bg-luxury-dark border border-white/10 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">
                      Email Privado *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ejemplo@email.com"
                      className="w-full bg-luxury-dark border border-white/10 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all"
                      required
                    />
                  </div>

                  {/* Móvil */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">
                      Móvil de Contacto *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+34 600 000 000"
                      className="w-full bg-luxury-dark border border-white/10 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Mensaje */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">
                    Mensaje (Opcional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Deseo coordinar una visita privada para la próxima semana..."
                    className="w-full bg-luxury-dark border border-white/10 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all resize-none"
                  />
                </div>

                {/* Consentimiento RGPD */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="rgpdConsent"
                    name="rgpdConsent"
                    checked={formData.rgpdConsent}
                    onChange={handleInputChange}
                    className="mt-1 h-4.5 w-4.5 accent-luxury-gold rounded border-white/10 focus:ring-0 outline-none cursor-pointer"
                    required
                  />
                  <label htmlFor="rgpdConsent" className="text-xs text-gray-400 leading-relaxed cursor-pointer select-none">
                    Doy mi consentimiento para el tratamiento de mis datos personales para la gestión de mi solicitud, aceptando la{' '}
                    <a href="#privacidad" className="text-luxury-gold hover:underline font-medium">
                      Política de Privacidad
                    </a>{' '}
                    y el reglamento general de protección de datos.
                  </label>
                </div>

                {/* CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-luxury-gold hover:bg-luxury-gold-hover disabled:bg-luxury-gold/50 text-luxury-black font-bold py-4 px-6 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-luxury-gold/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-luxury-black" />
                      Procesando Solicitud...
                    </>
                  ) : (
                    <>
                      Solicitar Información
                      <ArrowRight className="w-4 h-4 text-luxury-black" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Agent Profile and Trust blocks */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Agent Profile Ficha */}
            <div className="bg-luxury-dark p-6 rounded-2xl border border-white/5 space-y-6 shadow-xl">
              <div className="flex items-center gap-4">
                {/* Agent Photo in Gold Border Circle */}
                <div className="w-16 h-16 rounded-full border-2 border-luxury-gold overflow-hidden shrink-0 shadow-md">
                  <img
                    src={agencyInfo.agent.photo}
                    alt={agencyInfo.agent.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-white tracking-wide">
                    {agencyInfo.agent.name}
                  </h3>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-luxury-gold font-semibold">
                    {agencyInfo.agent.role}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium font-sans">
                    {agencyInfo.agent.agencyName}
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-300 font-sans leading-relaxed italic border-l-2 border-luxury-gold/40 pl-4">
                “{agencyInfo.agent.bio}”
              </p>

              {/* Contact direct lines */}
              <div className="space-y-3 pt-2">
                <a
                  href={`mailto:${agencyInfo.email}`}
                  className="flex items-center gap-3 text-xs text-gray-300 hover:text-luxury-gold transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-luxury-gold/40">
                    <Mail className="w-3.5 h-3.5 text-luxury-gold" />
                  </div>
                  {agencyInfo.email}
                </a>

                <a
                  href={`https://wa.me/${agencyInfo.phone}?text=Hola%20Magdalena,%20deseo%20solicitar%20información%20exclusiva%20sobre%20la%20Villa%20en%20Simón%20Verde.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs text-gray-300 hover:text-luxury-gold transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-luxury-gold/40">
                    <Phone className="w-3.5 h-3.5 text-luxury-gold" />
                  </div>
                  {agencyInfo.phoneFormatted} (WhatsApp)
                </a>
              </div>
            </div>

            {/* Confidence Block 1 */}
            <div className="flex gap-4 items-start p-4">
              <div className="w-10 h-10 rounded-lg border border-luxury-gold/30 bg-luxury-gold/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-luxury-gold" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs uppercase tracking-widest font-bold text-white font-mono">
                  Atención Personalizada y Privada
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Su información es tratada bajo estrictas directrices de confidencialidad. No compartimos sus datos con terceros bajo ningún concepto.
                </p>
              </div>
            </div>

            {/* Confidence Block 2 */}
            <div className="flex gap-4 items-start p-4">
              <div className="w-10 h-10 rounded-lg border border-luxury-gold/30 bg-luxury-gold/10 flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5 text-luxury-gold" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs uppercase tracking-widest font-bold text-white font-mono">
                  Sello Comprarcasa SuHogar
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Garantía de excelencia respaldada por la mayor red de profesionales inmobiliarios de Sevilla, caracterizados por un trato exclusivo y transparente.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
