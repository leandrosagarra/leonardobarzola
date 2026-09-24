import { MapPin, Phone, Mail, Navigation, Clock, CheckCircle } from 'lucide-react';
import { ContactInfo, ScheduleInfo } from '../types';

interface ContactSectionProps {
  contact: ContactInfo;
  schedule: ScheduleInfo;
}

export function ContactSection({ contact, schedule }: ContactSectionProps) {
  const address = contact?.address || 'Calle 48 nº 874, primer piso oficina 24';
  const city = contact?.city || 'La Plata, Buenos Aires';
  const phone = contact?.phone || '0221 618-6574';
  const email = contact?.email || 'escribaniabarzola@gmail.com';
  const weekdays = schedule?.weekdays || '9:00 a 16:00';
  const friday = schedule?.friday || '9:00 a 14:30';
  const weekend = schedule?.weekend || 'Cerrado';

  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=-34.91888,-57.95670`;

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-[#FBF9F5] border-t border-[#ECE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DD] text-[#7B6353] text-xs font-semibold uppercase tracking-wider mb-3">
            Ubicación y atención
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#29201B] tracking-tight">
            Escribanía Barzola
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A4A3F] leading-relaxed">
            Estamos a tu disposición en nuestra sede notarial en la ciudad de La Plata.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white p-7 sm:p-9 rounded-2xl border border-[#E3D7C6] shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif-title text-2xl font-semibold text-[#29201B]">
                  Datos de contacto
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#8A7363] mt-1">
                  Atención notarial personalizada
                </p>
              </div>

              {/* Address item */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F5ECE0] border border-[#E6D7C4] flex items-center justify-center shrink-0 mt-0.5 text-[#9A4E38]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-[#8C7666] tracking-wider">
                    Dirección
                  </div>
                  <div className="text-base font-semibold text-[#2A201A] mt-0.5">
                    {address}
                  </div>
                  <div className="text-xs text-[#6F5E53]">
                    {city}
                  </div>
                </div>
              </div>

              {/* Phone item */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F5ECE0] border border-[#E6D7C4] flex items-center justify-center shrink-0 mt-0.5 text-[#9A4E38]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-[#8C7666] tracking-wider">
                    Teléfono directo
                  </div>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="text-lg font-bold text-[#2A201A] hover:text-[#9A4E38] transition-colors mt-0.5 block"
                  >
                    {phone}
                  </a>
                  <div className="text-xs text-[#6F5E53]">
                    Línea disponible en horario de escribanía
                  </div>
                </div>
              </div>

              {/* Email item */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F5ECE0] border border-[#E6D7C4] flex items-center justify-center shrink-0 mt-0.5 text-[#9A4E38]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-[#8C7666] tracking-wider">
                    Correo electrónico
                  </div>
                  <a
                    href={`mailto:${email}`}
                    className="text-base sm:text-lg font-bold text-[#2A201A] hover:text-[#9A4E38] transition-colors mt-0.5 block break-all"
                  >
                    {email}
                  </a>
                  <div className="text-xs text-[#6F5E53]">
                    Consultas e información general
                  </div>
                </div>
              </div>

              {/* Schedule item */}
              <div className="flex items-start gap-4 pt-2 border-t border-[#EFE7DC]">
                <div className="w-10 h-10 rounded-lg bg-[#F5ECE0] border border-[#E6D7C4] flex items-center justify-center shrink-0 mt-0.5 text-[#9A4E38]">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase font-semibold text-[#8C7666] tracking-wider mb-2">
                    Horarios de atención
                  </div>
                  <div className="space-y-1.5 text-xs sm:text-sm text-[#4A3B31]">
                    <div className="flex justify-between py-1 border-b border-[#F5ECE0]">
                      <span className="font-medium text-[#29201B]">Lunes a jueves</span>
                      <span className="font-semibold">{weekdays}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#F5ECE0]">
                      <span className="font-medium text-[#29201B]">Viernes</span>
                      <span className="font-semibold">{friday}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#8B7565]">Sábados y domingos</span>
                      <span className="text-[#994732] font-semibold">{weekend}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notice: No booking system needed */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-lg border border-[#EAE0D1] flex items-center gap-2.5 text-xs text-[#5D4C42]">
                <CheckCircle className="w-4 h-4 text-[#2B5E3F] shrink-0" />
                <span>Atención directa y presencial por orden de llegada, sin necesidad de turnero.</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="mt-8 pt-6 border-t border-[#EFE7DC] grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-[#3D3029] hover:bg-[#28201B] text-[#FAF6F0] text-xs font-semibold transition-all shadow-xs"
              >
                <Navigation className="w-4 h-4 text-[#DECAB5]" />
                <span>Cómo llegar</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-[#EFE8DD] hover:bg-[#E4DCCE] text-[#342721] border border-[#D8CCBA] text-xs font-semibold transition-all shadow-xs"
              >
                <Phone className="w-4 h-4 text-[#9A4E38]" />
                <span>Llamar a la escribanía</span>
              </a>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E3D7C6] overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 bg-[#FAF7F2] border-b border-[#ECE2D4] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#5A483E]">
                <MapPin className="w-4 h-4 text-[#9A4E38]" />
                <span>{address}, {city}</span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#9A4E38] hover:underline"
              >
                Abrir en Google Maps ↗
              </a>
            </div>

            <div className="relative w-full h-80 sm:h-96 lg:h-full min-h-[350px]">
              <iframe
                title="Ubicación de Escribanía Barzola en La Plata"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-57.9602%2C-34.9212%2C-57.9532%2C-34.9165&amp;layer=mapnik&amp;marker=-34.91888%2C-57.95670"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
