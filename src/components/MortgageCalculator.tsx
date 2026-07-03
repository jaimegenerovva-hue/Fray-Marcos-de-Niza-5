import { useState } from 'react';

export default function MortgageCalculator() {
  const [price, setPrice] = useState<number>(1145000);
  const [downPct, setDownPct] = useState<number>(30);
  const [term, setTerm] = useState<number>(30);
  const [rate, setRate] = useState<number>(2.2);
  const [rateType, setRateType] = useState<string>('fijo');

  const TAX_PERCENT = 0.07;
  const TAX_FIXED = 1993;

  const downAmount = price * (downPct / 100);
  const taxes = price * TAX_PERCENT + TAX_FIXED;
  const loanAmount = Math.max(price + taxes - downAmount, 0);

  const monthlyRate = (rate / 100) / 12;
  const numPayments = term * 12;
  let monthlyPayment = 0;
  if (monthlyRate > 0 && loanAmount > 0) {
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else if (loanAmount > 0) {
    monthlyPayment = loanAmount / numPayments;
  }

  const fmtEUR = (value: number) => {
    return Math.round(value).toLocaleString('es-ES') + ' €';
  };

  const handleRateMinus = () => {
    setRate(prev => Math.max(0.1, Math.round((prev - 0.1) * 10) / 10));
  };

  const handleRatePlus = () => {
    setRate(prev => Math.round((prev + 0.1) * 10) / 10);
  };

  const handleCtaClick = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      const headerOffset = 90;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Try to pre-fill the message textarea in LeadCaptureForm
      const messageInput = document.getElementById('message') as HTMLTextAreaElement | null;
      if (messageInput) {
        messageInput.value = `Hola Magdalena, acabo de calcular la hipoteca para la Villa Santa Clara. Mi precio estimado es de ${fmtEUR(price)} con un ahorro aportado de ${fmtEUR(downAmount)} (${downPct}%) a ${term} años con tipo de interés del ${rate.toFixed(1).replace('.', ',')}% (${rateType === 'fijo' ? 'Fijo' : 'Variable'}). Me gustaría solicitar una simulación formal.`;
        
        // Dispatch synthetic events to make sure React captures the value change
        const event = new Event('input', { bubbles: true });
        messageInput.dispatchEvent(event);
        const changeEvent = new Event('change', { bubbles: true });
        messageInput.dispatchEvent(changeEvent);
      }
    }
  };

  return (
    <section id="calculadora-hipoteca" className="bg-luxury-cream py-20 md:py-28 text-luxury-navy overflow-hidden scroll-mt-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="block text-[11px] font-mono tracking-widest text-luxury-gold uppercase font-semibold">
            ESTUDIO DE VIABILIDAD
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-luxury-navy tracking-tight leading-tight">
            El primer paso <br />
            <span className="text-luxury-gold italic font-light font-serif">
              hacia su futuro
            </span>
          </h2>
        </div>

        <div id="mortgage-calc-root" className="mc-wrapper">
          <style dangerouslySetInnerHTML={{ __html: `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
            .mc-wrapper { font-family: 'Inter', sans-serif; width: 100%; max-width: 980px; margin: 0 auto; background: #FFFFFF; color: #1A1A1A; border-radius: 24px; overflow: hidden; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 30px 70px -20px rgba(0,0,0,0.15); padding: 48px; box-sizing: border-box; }
            .mc-header { margin-bottom: 36px; }
            .mc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
            .mc-col-left { display: flex; flex-direction: column; }
            .mc-col-right { display: flex; flex-direction: column; border-left: 1px solid rgba(0,0,0,0.08); padding-left: 48px; }
            .mc-title { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 8px 0; color: #1A1A1A; }
            .mc-title span { color: #C5A059; }
            .mc-subtitle { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(0,0,0,0.45); font-weight: 700; margin-bottom: 0; }
            .mc-field { margin-bottom: 28px; }
            .mc-field:last-child { margin-bottom: 0; }
            .mc-field-label { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
            .mc-field-label label { font-size: 14px; font-weight: 700; color: #1A1A1A; display: flex; align-items: center; gap: 6px; }
            .mc-info-icon { width: 14px; height: 14px; border-radius: 50%; background: rgba(197,160,89,0.15); color: #C5A059; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; cursor: help; }
            .mc-input-box { border: 1px solid rgba(0,0,0,0.15); border-radius: 10px; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; }
            .mc-input-box input[type="text"] { border: none; outline: none; font-size: 16px; font-weight: 700; text-align: center; width: 100%; font-family: 'Inter', sans-serif; color: #1A1A1A; background: transparent; }
            .mc-pct-tag { font-size: 12px; font-weight: 700; color: #C5A059; margin-left: 8px; white-space: nowrap; }
            .mc-slider { -webkit-appearance: none; width: 100%; height: 4px; border-radius: 10px; background: rgba(0,0,0,0.1); outline: none; margin-top: 14px; }
            .mc-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #C5A059; cursor: pointer; border: 3px solid #FFFFFF; box-shadow: 0 2px 6px rgba(0,0,0,0.25); }
            .mc-slider::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: #C5A059; cursor: pointer; border: 3px solid #FFFFFF; box-shadow: 0 2px 6px rgba(0,0,0,0.25); }
            .mc-slider-track-filled { position: relative; }
            .mc-rate-row { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
            .mc-radio { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; font-weight: 700; }
            .mc-radio input { accent-color: #C5A059; width: 16px; height: 16px; cursor: pointer; }
            .mc-rate-stepper { margin-left: auto; display: flex; align-items: center; border: 1px solid rgba(0,0,0,0.15); border-radius: 10px; overflow: hidden; }
            .mc-rate-stepper button { background: #FFFFFF; border: none; width: 36px; height: 40px; font-size: 18px; font-weight: 700; color: #C5A059; cursor: pointer; }
            .mc-rate-stepper button:hover { background: rgba(197,160,89,0.08); }
            .mc-rate-stepper span { min-width: 60px; text-align: center; font-weight: 700; font-size: 15px; }
            .mc-result-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; font-size: 14px; color: rgba(0,0,0,0.65); border-bottom: 1px solid rgba(0,0,0,0.06); }
            .mc-result-row.mc-strong { font-weight: 800; color: #1A1A1A; font-size: 16px; border-bottom: none; padding-top: 18px; }
            .mc-result-value { font-weight: 700; color: #1A1A1A; }
            .mc-result-row.mc-strong .mc-result-value { color: #C5A059; font-size: 22px; }
            .mc-cta { width: 100%; margin-top: 24px; background: #1A1A1A; color: #FFFFFF; border: none; border-radius: 100px; padding: 16px; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: all 0.3s; }
            .mc-cta:hover { background: #C5A059; color: #1A1A1A; }
            .mc-disclaimer { font-size: 11px; color: rgba(0,0,0,0.4); margin-top: 16px; line-height: 1.5; }
            .mc-disclaimer a { color: #C5A059; text-decoration: underline; }
            @media (max-width: 860px) { .mc-wrapper { padding: 32px 24px; border-radius: 20px; } .mc-grid { grid-template-columns: 1fr; gap: 32px; } .mc-col-right { border-left: none; padding-left: 0; border-top: 1px solid rgba(0,0,0,0.08); padding-top: 32px; } .mc-rate-stepper { margin-left: 0; } .mc-rate-row { gap: 16px; } }
          ` }} />

          <div className="mc-header">
            <div className="mc-title">Calculadora de <span>Hipoteca</span></div>
            <div className="mc-subtitle">Comprarcasa Suhogar Sevilla</div>
          </div>

          <div className="mc-grid">
            <div className="mc-col-left">
              <div className="mc-field">
                <div className="mc-field-label"><label>Precio del inmueble</label></div>
                <div className="mc-input-box">
                  <input type="text" id="mc-price-display" value={fmtEUR(price)} readOnly />
                </div>
                <input
                  type="range"
                  id="mc-price"
                  className="mc-slider"
                  min="50000"
                  max="3000000"
                  step="5000"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                />
              </div>

              <div className="mc-field">
                <div className="mc-field-label"><label>Ahorro aportado</label></div>
                <div className="mc-input-box">
                  <input type="text" id="mc-down-display" value={fmtEUR(downAmount)} readOnly />
                  <span class="mc-pct-tag" id="mc-down-pct">{downPct}%</span>
                </div>
                <input
                  type="range"
                  id="mc-down"
                  className="mc-slider"
                  min="0"
                  max="100"
                  step="1"
                  value={downPct}
                  onChange={(e) => setDownPct(parseInt(e.target.value, 10))}
                />
              </div>

              <div className="mc-field">
                <div className="mc-field-label"><label>Plazo en años</label></div>
                <div className="mc-input-box">
                  <input type="text" id="mc-term-display" value={term} readOnly />
                </div>
                <input
                  type="range"
                  id="mc-term"
                  className="mc-slider"
                  min="5"
                  max="40"
                  step="1"
                  value={term}
                  onChange={(e) => setTerm(parseInt(e.target.value, 10))}
                />
              </div>

              <div className="mc-field">
                <div className="mc-field-label">
                  <label>Tipo de interés <span className="mc-info-icon" title="Estimación orientativa">i</span></label>
                </div>
                <div className="mc-rate-row">
                  <label className="mc-radio">
                    <input
                      type="radio"
                      name="mc-rate-type"
                      value="fijo"
                      checked={rateType === 'fijo'}
                      onChange={() => setRateType('fijo')}
                    />{' '}
                    Fijo
                  </label>
                  <label className="mc-radio">
                    <input
                      type="radio"
                      name="mc-rate-type"
                      value="variable"
                      checked={rateType === 'variable'}
                      onChange={() => setRateType('variable')}
                    />{' '}
                    Variable
                  </label>
                  <div className="mc-rate-stepper">
                    <button id="mc-rate-minus" type="button" onClick={handleRateMinus}>−</button>
                    <span id="mc-rate-display">{rate.toFixed(1).replace('.', ',')}%</span>
                    <button id="mc-rate-plus" type="button" onClick={handleRatePlus}>+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mc-col-right">
              <div className="mc-result-row">
                <span>Impuestos y gastos <span className="mc-info-icon" title="Estimación orientativa (ITP + gastos de notaría, registro y gestoría)">i</span></span>
                <span className="mc-result-value" id="mc-taxes">{fmtEUR(taxes)}</span>
              </div>
              <div className="mc-result-row">
                <span>Importe del préstamo:</span>
                <span className="mc-result-value" id="mc-loan-amount">{fmtEUR(loanAmount)}</span>
              </div>
              <div className="mc-result-row mc-strong">
                <span>Tu cuota mensual:</span>
                <span className="mc-result-value" id="mc-monthly-payment">{fmtEUR(monthlyPayment)}</span>
              </div>

              <button className="mc-cta" id="mc-cta-btn" onClick={handleCtaClick}>
                Solicitar Simulación con Magdalena
              </button>

              <div className="mc-disclaimer">
                Estos resultados son orientativos, calculados con los números que has
                introducido.{' '}
                <a
                  href="#"
                  id="mc-conditions-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCtaClick();
                  }}
                >
                  Condiciones generales.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
