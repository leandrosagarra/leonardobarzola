import { Lock, Phone, MessageCircle, MapPin } from 'lucide-react';
import { ContactInfo } from '../types';

interface FooterProps {
  contact: ContactInfo;
  onOpenAdmin: () => void;
}

export function Footer({ contact, onOpenAdmin }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const phone = contact?.phone || '0221 618-6574';
  const whatsappNumber = contact?.whatsappNumber || '0221 618-6574';
  const address = contact?.address || 'Calle 48 nº 874, primer piso oficina 24';
  const city = contact?.city || 'La Plata, Buenos Aires';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#2D231E] text-[#EFE7DC] border-t border-[#44352D] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#44352D]">
          {/* Brand Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Escribanía Barzola Logo"
                className="w-12 h-12 rounded-full object-cover border border-[#C5A059]/40 shadow-xs"
              />
              <div>
                <h3 className="font-serif-title text-xl font-semibold text-[#FAF7F2]">
                  Escribanía Barzola
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#BAA390]">
                  Servicios notariales · La Plata
                </p>
              </div>
            </div>
            <p className="text-sm text-[#C8B8A7] leading-relaxed max-w-sm">
              Brindamos soluciones notariales con atención personalizada, cercana y profesional. Cada trámite con la seguridad jurídica y claridad que necesitás.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#BAA390]">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-[#D8C9BB]">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Servicios notariales
                </a>
              </li>
              <li>
                <a href="#la-escribania" className="hover:text-white transition-colors">
                  La Escribanía
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white transition-colors">
                  Ubicación y contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#BAA390]">
              Contacto directo
            </h4>
            <div className="space-y-2 text-sm text-[#D8C9BB]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>{address}, {city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <a href={`tel:${cleanPhone}`} className="hover:underline">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#3FA86E]" />
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=Hola,%20quisiera%20hacer%20una%20consulta%20a%20Escriban%C3%ADa%20Barzola`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  WhatsApp disponible
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E8B7A]">
          <p>© {currentYear} Escribanía Barzola. Todos los derechos reservados. La Plata, Buenos Aires.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-[#BAA390] hover:text-[#FAF7F2] transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Administración (PIN 1414)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
