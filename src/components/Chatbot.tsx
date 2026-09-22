import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  MessageCircle,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { ChatMessage, NotarySiteData } from '../types';

interface ChatbotProps {
  siteData: NotarySiteData;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  externalQuery?: string | null;
  onClearExternalQuery?: () => void;
}

const QUICK_OPTIONS = [
  'Comprar o vender una propiedad',
  'Certificar una firma',
  'Hacer un poder',
  'Sucesión o testamento',
  'Apostilla / legalización',
  'Horarios y ubicación',
  'Otra consulta',
];

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'init-msg',
  role: 'assistant',
  text: '¡Hola! 👋 Soy el asistente virtual de Escribanía Barzola. Puedo ayudarte con información sobre nuestros servicios, documentación, ubicación, horarios y formas de contacto. ¿Qué necesitás consultar?',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  requiresContact: false,
};

export function Chatbot({
  siteData,
  isOpen,
  onClose,
  onOpen,
  externalQuery,
  onClearExternalQuery,
}: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Handle external queries triggered from buttons throughout the page
  useEffect(() => {
    if (externalQuery && externalQuery.trim()) {
      handleSendMessage(externalQuery);
      if (onClearExternalQuery) {
        onClearExternalQuery();
      }
    }
  }, [externalQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
          knowledge: siteData,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al conectar con el servidor');
      }

      const data = await response.json();
      const botReply = data.reply || 'Ese caso requiere una consulta particular con la escribanía. Podés comunicarte directamente para recibir asesoramiento.';
      const isFallbackPhrase =
        data.requiresContact ||
        botReply.includes('Ese caso requiere una consulta particular') ||
        botReply.includes('comunicarte directamente para recibir asesoramiento');

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        requiresContact: isFallbackPhrase,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.warn('Usando respuesta de contingencia:', err);
      // Client-side fallback if server fails
      const fallbackReply = 'Ese caso requiere una consulta particular con la escribanía. Podés comunicarte directamente para recibir asesoramiento.';
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          requiresContact: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        ...INITIAL_BOT_MESSAGE,
        id: `init-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const cleanPhone = siteData.contact.phone.replace(/[^0-9]/g, '');
  const cleanWhatsapp = siteData.contact.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#1F7A4C] hover:bg-[#18633D] text-white shadow-xl hover:shadow-2xl transition-all duration-200 group active:scale-95 border border-[#2CA366]/40 cursor-pointer font-semibold text-sm tracking-wide"
          aria-label="Asistente Virtual"
        >
          <div className="relative">
            <img
              src="/logo.png"
              alt="Logo Escribanía"
              className="w-7 h-7 rounded-full object-cover border border-white/60 shrink-0"
            />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#75E89F] border-2 border-[#1F7A4C]" />
          </div>
          <span>Asistente Virtual</span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 flex flex-col bg-[#FCFBF9] border border-[#D9CCB9] shadow-2xl rounded-2xl overflow-hidden transition-all duration-200 ${
            isExpanded
              ? 'inset-3 sm:inset-10 md:inset-16 max-w-4xl mx-auto'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Chat Header */}
          <div className="bg-[#382C26] text-[#FAF6F0] px-4 sm:px-5 py-3.5 flex items-center justify-between border-b border-[#4E3E36] shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Logo Escribanía"
                  className="w-9 h-9 rounded-full object-cover border border-[#C5A059]"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#3FA86E] border-2 border-[#382C26]" />
              </div>
              <div>
                <h3 className="font-serif-title text-sm sm:text-base font-semibold leading-tight text-[#FAF7F2]">
                  Asistente de Escribanía Barzola
                </h3>
                <span className="text-[11px] text-[#DECBB7] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D8B67D]" />
                  Orientación notarial inmediata
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[#D9C8B5]">
              <button
                onClick={resetConversation}
                className="p-1.5 hover:bg-[#4C3D35] rounded-md transition-colors"
                title="Reiniciar conversación"
                aria-label="Reiniciar conversación"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:bg-[#4C3D35] rounded-md transition-colors hidden sm:block"
                title={isExpanded ? 'Reducir tamaño' : 'Ampliar tamaño'}
                aria-label={isExpanded ? 'Reducir tamaño' : 'Ampliar tamaño'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-[#4C3D35] rounded-md transition-colors"
                title="Cerrar chat"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#FAF7F2]/50">
            {messages.map((msg) => {
              const isBot = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                      isBot
                        ? 'bg-white border border-[#E5DACB] text-[#2C211B] shadow-2xs rounded-tl-xs'
                        : 'bg-[#3E3129] text-[#FAF7F2] rounded-tr-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {/* Direct Contact Buttons if bot requires contact (Regla fundamental) */}
                    {isBot && msg.requiresContact && (
                      <div className="mt-3.5 pt-3 border-t border-[#EFE5D7] flex flex-col sm:flex-row gap-2">
                        <a
                          href={`tel:${cleanPhone}`}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#EFE8DC] hover:bg-[#E4DCCE] text-[#342721] border border-[#DACDBD] text-xs font-semibold transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#9A4E38]" />
                          <span>Llamar a la escribanía</span>
                        </a>

                        <a
                          href={`https://wa.me/${cleanWhatsapp}?text=Hola,%20tengo%20una%20consulta%20para%20Escriban%C3%ADa%20Barzola`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#2B5E3F] hover:bg-[#204930] text-white text-xs font-semibold transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Consultar por WhatsApp</span>
                        </a>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#8E796A] mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="bg-white border border-[#E5DACB] rounded-2xl rounded-tl-xs p-3.5 shadow-2xs flex items-center gap-1.5 text-xs text-[#6F5D51]">
                  <span className="w-2 h-2 rounded-full bg-[#A85D44] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-[#A85D44] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#A85D44] animate-bounce" />
                  <span className="ml-1.5 text-xs text-[#826D5F]">Consultando información...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Options Chips */}
          <div className="px-3.5 py-2.5 bg-[#F5ECE0]/70 border-t border-[#E8DAC8] overflow-x-auto scrollbar-none flex gap-1.5">
            {QUICK_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSendMessage(opt)}
                disabled={isLoading}
                className="whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF4ED] text-[#4F4036] border border-[#DFCEBB] shadow-2xs transition-colors shrink-0 disabled:opacity-50"
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#E5DACB] flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribí tu consulta..."
              disabled={isLoading}
              className="flex-1 bg-[#FAF7F2] text-[#29201B] placeholder-[#8A7667] text-sm px-4 py-2.5 rounded-xl border border-[#DECBB8] focus:outline-hidden focus:border-[#9A4E38] focus:ring-1 focus:ring-[#9A4E38] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-xl bg-[#3E3129] hover:bg-[#28201B] text-[#FAF6F0] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
