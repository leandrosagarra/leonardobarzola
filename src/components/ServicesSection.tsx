import { useState } from 'react';
import {
  FileText,
  PenTool,
  ShieldCheck,
  Scroll,
  Globe,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onOpenChat: (initialQuery?: string) => void;
}

export function ServicesSection({ services, onOpenChat }: ServicesSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getServiceIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-[#9A4E38]' };
    switch (iconName) {
      case 'FileText':
        return <FileText {...props} />;
      case 'PenTool':
        return <PenTool {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'Scroll':
        return <Scroll {...props} />;
      case 'Globe':
        return <Globe {...props} />;
      case 'BookOpen':
        return <BookOpen {...props} />;
      case 'Award':
        return <Award {...props} />;
      default:
        return <FileText {...props} />;
    }
  };

  return (
    <section id="servicios" className="py-16 sm:py-24 bg-[#FBF9F5] border-t border-[#EFE8DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DD] text-[#7B6353] text-xs font-semibold uppercase tracking-wider mb-3">
            Áreas notariales
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#29201B] tracking-tight">
            ¿En qué podemos ayudarte?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5E4E43] leading-relaxed">
            Conocé nuestros principales servicios notariales. Hacé clic en cualquier trámite para conocer más detalles y requisitos habituales.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {services.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                id={`servicio-${service.id}`}
                className={`flex flex-col justify-between rounded-xl border transition-all duration-300 bg-white/70 backdrop-blur-xs ${
                  isExpanded
                    ? 'border-[#9A4E38]/40 shadow-md ring-1 ring-[#9A4E38]/20 bg-white'
                    : 'border-[#E7DED1] hover:border-[#D0C2AF] hover:shadow-sm'
                }`}
              >
                <div className="p-6 sm:p-7">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#F5ECE0] border border-[#E8DAC7] flex items-center justify-center shrink-0">
                      {getServiceIcon(service.icon)}
                    </div>
                    <div>
                      <h3 className="font-serif-title text-xl font-semibold text-[#2A201B] leading-snug">
                        {service.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-[#5C4C41] leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Expandable details content */}
                  {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-[#EFE7DC] space-y-4 animate-in fade-in duration-200">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8B7362] mb-1.5">
                          Descripción del trámite
                        </h4>
                        <p className="text-sm text-[#4E4037] leading-relaxed">
                          {service.fullDetails}
                        </p>
                      </div>

                      {service.requirements && service.requirements.length > 0 && (
                        <div>
                          <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8B7362] mb-2 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2B5E3F]" />
                            <span>Documentación habitual orientativa</span>
                          </h4>
                          <ul className="space-y-1.5 text-xs text-[#55463D]">
                            {service.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-[#9A4E38] font-bold mt-0.5">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Explicit prompt phrase at the end of each explanation */}
                      <div className="pt-3 border-t border-[#F2ECE2] bg-[#FAF6F0] -mx-2 px-3 py-3 rounded-lg">
                        <p className="text-xs font-medium text-[#49392E] mb-2">
                          ¿Tenés dudas sobre este trámite? Consultá al asistente virtual.
                        </p>
                        <button
                          onClick={() => onOpenChat(`Tengo una consulta sobre ${service.title.toLowerCase()}`)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A4E38] hover:text-[#7A3622] transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Preguntarle al asistente sobre {service.title} →</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer toggle */}
                <div className="px-6 py-3.5 bg-[#FAF7F2] border-t border-[#ECE3D5] rounded-b-xl flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6A574A] hover:text-[#2A201B] transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Menos información' : 'Ver más información'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => onOpenChat(`¿Qué necesito para realizar ${service.title.toLowerCase()}?`)}
                    className="text-xs text-[#9A4E38] hover:text-[#793522] flex items-center gap-1 font-medium"
                    title={`Consultar por ${service.title}`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Consultar</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
