import {
  CreditCard,
  Hash,
  Home,
  FolderArchive,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { UsefulDocItem } from '../types';

interface UsefulInfoSectionProps {
  usefulDocs: UsefulDocItem[];
  onOpenChat: (initialQuery?: string) => void;
}

export function UsefulInfoSection({ usefulDocs, onOpenChat }: UsefulInfoSectionProps) {
  const getDocIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-[#9A4E38]' };
    switch (iconName) {
      case 'CreditCard':
        return <CreditCard {...props} />;
      case 'Hash':
        return <Hash {...props} />;
      case 'Home':
        return <Home {...props} />;
      case 'FolderArchive':
        return <FolderArchive {...props} />;
      default:
        return <FolderArchive {...props} />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F5EFE6]/60 border-t border-[#EAE1D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0D1] text-[#786151] text-xs font-semibold uppercase tracking-wider mb-3">
            Información útil
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-semibold text-[#29201B] tracking-tight">
            Antes de realizar tu trámite
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A4A3F] leading-relaxed">
            Cada trámite tiene características y requisitos particulares. Contar desde el inicio con la documentación correspondiente permite agilizar la gestión y evitar demoras innecesarias.
          </p>
        </div>

        {/* 4 Core Document Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {(usefulDocs || []).map((doc) => (
            <div
              key={doc.id}
              className="bg-[#FAF7F2] p-6 rounded-xl border border-[#E3D8C8] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#EFE4D4] border border-[#DECFBD] flex items-center justify-center mb-4">
                  {getDocIcon(doc.icon)}
                </div>
                <h3 className="font-serif-title text-lg font-semibold text-[#2B211C] mb-2">
                  {doc.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B4C42] leading-relaxed">
                  {doc.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Clarification Box */}
        <div className="max-w-3xl mx-auto bg-[#FBF9F5] border border-[#DFCFC0] rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="p-2 rounded-full bg-[#F5ECE0] text-[#9A4E38] shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#46372E] leading-relaxed">
              Los requisitos pueden variar según el trámite y cada situación particular. Si tenés dudas, podés consultar directamente al asistente virtual.
            </p>
          </div>
          <button
            onClick={() => onOpenChat('¿Qué documentación necesito llevar para mi trámite?')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#3C3029] hover:bg-[#28201B] text-[#FAF6F0] text-xs font-semibold shrink-0 transition-colors shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#E3CEB8]" />
            <span>Consultar documentación</span>
          </button>
        </div>
      </div>
    </section>
  );
}
