import { useState } from 'react';
import { Phone, Menu, X, Shield, Lock } from 'lucide-react';
import { ContactInfo } from '../types';

interface HeaderProps {
  contact: ContactInfo;
  onOpenAdmin: () => void;
  onOpenChat: (initialQuery?: string) => void;
}

export function Header({ contact, onOpenAdmin, onOpenChat }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const phone = contact?.phone || '0221 618-6574';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'La Escribanía', href: '#la-escribania' },
    { label: 'Preguntas frecuentes', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE3D6] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <a href="#inicio" className="flex items-center gap-3.5 group text-left">
            <img
              src="/logo.png"
              alt="Escribanía Barzola Logo"
              className="w-12 h-12 rounded-full object-cover shadow-xs border border-[#C5A059]/40 group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="block font-serif-title text-xl sm:text-2xl font-semibold tracking-tight text-[#2D231E]">
                Escribanía Barzola
              </span>
              <span className="block text-xs font-medium tracking-wide uppercase text-[#876F60]">
                Servicios notariales · La Plata
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#5A4B41] hover:text-[#2D231E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#A85D44] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg text-[#362C26] bg-[#EFE9DF] hover:bg-[#E4DCCE] transition-colors border border-[#DDD3C2] shadow-2xs"
              title={`Llamar a ${phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#9A4E38]" />
              <span>{phone}</span>
            </a>

            <button
              onClick={onOpenAdmin}
              className="p-2 text-[#876F60] hover:text-[#2D231E] hover:bg-[#EFE9DF] rounded-md transition-colors"
              title="Panel de administración (PIN)"
              aria-label="Panel de administración"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-[#876F60] hover:text-[#2D231E] rounded-md"
              aria-label="Admin"
            >
              <Lock className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#3F332D] hover:bg-[#EFE9DF] focus:outline-hidden"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#EAE3D6] bg-[#FAF8F5] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-base font-medium text-[#4A3C33] hover:text-[#2D231E] hover:bg-[#F2ECE1] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-[#EAE3D6]">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold bg-[#42342D] text-[#FAF6F0]"
            >
              <Phone className="w-4 h-4 text-[#D8C7B0]" />
              <span>Llamar al {phone}</span>
            </a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenChat();
            }}
            className="w-full mt-3 py-2.5 px-3 rounded-md text-sm font-semibold bg-[#EFE8DC] text-[#4A3B31] border border-[#DDD3C2] flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4 text-[#A85D44]" />
            <span>Consultar al asistente virtual</span>
          </button>
        </div>
      )}
    </header>
  );
}
