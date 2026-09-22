import { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { FaqItem } from '../types';

interface FaqSectionProps {
  faqs: FaqItem[];
  onOpenChat: (initialQuery?: string) => void;
}

export function FaqSection({ faqs, onOpenChat }: FaqSectionProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true, // Open the first FAQ by default
  });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F5EFE6]/50 border-t border-[#EAE0D1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0D1] text-[#7B6353] text-xs font-semibold uppercase tracking-wider mb-3">
            Preguntas frecuentes
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-semibold text-[#29201B] tracking-tight">
            Respuestas a dudas habituales
          </h2>
          <p className="mt-3 text-base text-[#5E4D42]">
            Información rápida sobre la escribanía, documentación y atención.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {(faqs || []).map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="bg-[#FAF7F2] rounded-xl border border-[#E3D7C6] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-4.5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 hover:bg-[#F4ECE0]/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif-title text-base sm:text-lg font-medium text-[#29201B]">
                    {faq.question}
                  </span>
                  <span
                    className={`p-1.5 rounded-full bg-[#EFE5D6] text-[#7E6655] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#E5D7C2]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-[#57473D] leading-relaxed border-t border-[#EFE5D6]/80 animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Chatbot prompt banner */}
        <div className="mt-10 p-6 rounded-xl bg-white/70 border border-[#DFCFC0] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-serif-title text-base sm:text-lg font-medium text-[#2C211B]">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4C42] mt-0.5">
              Consultale a nuestro asistente virtual o comunicate con la escribanía.
            </p>
          </div>
          <button
            onClick={() => onOpenChat()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#3C3029] hover:bg-[#28201B] text-[#FAF6F0] text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-xs"
          >
            <MessageSquare className="w-4 h-4 text-[#DFCBB6]" />
            <span>Consultar al asistente</span>
          </button>
        </div>
      </div>
    </section>
  );
}
