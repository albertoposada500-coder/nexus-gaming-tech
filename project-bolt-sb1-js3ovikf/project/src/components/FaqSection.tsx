import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { faqItems, paymentMethods } from '@/data';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-nexus-dark border-t border-nexus-border py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Payment methods carousel */}
        <div className="mb-16">
          <h3 className="text-center text-sm font-medium text-neutral-500 uppercase tracking-widest mb-6">
            Métodos de Pago Seguros
          </h3>
          <div className="relative overflow-hidden">
            <div className="flex gap-4 animate-scroll-x" style={{ width: 'max-content' }}>
              {[...paymentMethods, ...paymentMethods].map((method, i) => (
                <div
                  key={i}
                  className="shrink-0 px-8 py-4 bg-nexus-surface border border-nexus-border rounded-xl flex items-center justify-center min-w-[160px]"
                  style={{ borderLeft: `3px solid ${method.color}` }}
                >
                  <span className="text-lg font-bold text-white tracking-wide">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Preguntas Frecuentes
          </h2>
          <p className="text-center text-neutral-400 text-sm mb-8">
            Resolvemos tus dudas para que compres con confianza
          </p>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="bg-nexus-surface border border-nexus-border rounded-xl overflow-hidden transition-colors hover:border-nexus-border-bright"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-nexus-red shrink-0 transition-transform duration-300 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-neutral-400 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
