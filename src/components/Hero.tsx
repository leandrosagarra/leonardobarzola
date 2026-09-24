import { ArrowDown, MessageSquare, MapPin, Clock } from 'lucide-react';
import { ScheduleInfo } from '../types';

interface HeroProps {
  schedule: ScheduleInfo;
  onOpenChat: (initialQuery?: string) => void;
}

export function Hero({ schedule, onOpenChat }: HeroProps) {
  return (
    <section id="inicio" className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-radial-[at_top] from-[#F4EFE6] via-[#FAF8F5] to-[#FBF9F5]">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#EFE6D8]/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-[#E6DBCB]/40 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        {/* Logo emblem */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <img
              src="/logo.png"
              alt="Escribanía Barzola Sello Notarial"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-lg border-2 border-[#C5A059]/60 hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* Main Title */}
        <h1 className="font-serif-title text-4xl sm:text-6xl lg:text-7xl font-semibold text-[#271E19] leading-[1.15] tracking-tight max-w-4xl mx-auto">
          Soluciones Notariales
        </h1>

        {/* Subtitle */}
        <p className="mt-5 sm:mt-6 text-[13px] min-[360px]:text-[13.5px] min-[390px]:text-[15px] sm:text-xl md:text-[22px] text-[#58493F] leading-snug sm:leading-relaxed max-w-3xl mx-auto font-normal tracking-tight sm:tracking-normal">
          <span className="block">Te acompañamos y asesoramos para que cada trámite</span>
          <span className="block mt-0.5 sm:mt-0">sea más simple, claro y seguro.</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <a
            href="#servicios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#3C3029] text-[#FAF6F0] hover:bg-[#28201B] transition-all duration-200 text-base font-semibold shadow-md hover:shadow-lg active:scale-[0.99]"
          >
            <span>Conocer nuestros servicios</span>
            <ArrowDown className="w-4 h-4 text-[#D8C7B0]" />
          </a>

          <button
            onClick={() => onOpenChat()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#F1E9DC] hover:bg-[#E7DDCE] text-[#3D3028] border border-[#D5C7B2] transition-all duration-200 text-base font-semibold shadow-xs active:scale-[0.99]"
          >
            <MessageSquare className="w-4 h-4 text-[#1F7A4C]" />
            <span>Hacer una consulta</span>
          </button>
        </div>

        {/* Value markers */}
        <div className="mt-12 pt-8 border-t border-[#EAE2D5] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#665447]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-[#EFE8DC] text-[#984E37]">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="font-medium">Calle 48 nº 874, primer piso of. 24, La Plata</span>
          </div>

          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#D6C5B3]" />

          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-[#EFE8DC] text-[#984E37]">
              <Clock className="w-4 h-4" />
            </div>
            <span className="font-medium">Lunes a jueves {schedule?.weekdays || '9:00 a 16:00'} · Viernes {schedule?.friday || '9:00 a 14:30'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
