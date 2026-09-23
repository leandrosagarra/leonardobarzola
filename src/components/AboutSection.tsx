import { HeartHandshake, Award, FileSearch, Users } from 'lucide-react';
import { InstitutionalPillar } from '../types';

interface AboutSectionProps {
  title: string;
  subtitle: string;
  pillars: InstitutionalPillar[];
}

export function AboutSection({ title, subtitle, pillars }: AboutSectionProps) {
  const getPillarIcon = (id: string) => {
    const props = { className: 'w-6 h-6 text-[#9A4E38]' };
    switch (id) {
      case 'personalizada':
        return <HeartHandshake {...props} />;
      case 'profesionalismo':
        return <Award {...props} />;
      case 'claridad':
        return <FileSearch {...props} />;
      case 'cercania':
        return <Users {...props} />;
      default:
        return <Award {...props} />;
    }
  };

  return (
    <section id="la-escribania" className="py-16 sm:py-24 bg-[#FBF9F5] border-t border-[#ECE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DD] text-[#7B6353] text-xs font-semibold uppercase tracking-wider mb-3">
            Institucional
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#29201B] tracking-tight">
            {title}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#5A4A3F] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {(pillars || []).map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white/80 p-6 sm:p-7 rounded-xl border border-[#E5DBCC] shadow-xs flex flex-col justify-between hover:border-[#CFBFA9] transition-colors"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#F5EDE2] border border-[#E4D5C2] flex items-center justify-center mb-5">
                  {getPillarIcon(pillar.id)}
                </div>
                <h3 className="font-serif-title text-lg sm:text-xl font-semibold text-[#2A201A] mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#5B4C41] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
