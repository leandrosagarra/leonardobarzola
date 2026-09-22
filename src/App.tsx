/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { INITIAL_NOTARY_DATA } from './data/initialData';
import { NotarySiteData } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { UsefulInfoSection } from './components/UsefulInfoSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Chatbot } from './components/Chatbot';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'escribania_barzola_site_data';

export default function App() {
  const [siteData, setSiteData] = useState<NotarySiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.institutionalSubtitle && parsed.institutionalSubtitle.includes('En Escribanía Barzola')) {
          parsed.institutionalSubtitle = parsed.institutionalSubtitle.replace('En Escribanía Barzola', 'En la Escribanía');
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          } catch (err) {
            // ignore
          }
        }
        return parsed;
      }
    } catch (e) {
      console.error('Error loading saved data from localStorage:', e);
    }
    return INITIAL_NOTARY_DATA;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [externalChatQuery, setExternalChatQuery] = useState<string | null>(null);

  // Sync to localStorage
  const handleSaveData = (newData: NotarySiteData) => {
    setSiteData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Error saving data to localStorage:', e);
    }
  };

  const handleResetData = () => {
    setSiteData(INITIAL_NOTARY_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error removing data from localStorage:', e);
    }
  };

  const handleOpenChat = (query?: string) => {
    setIsChatOpen(true);
    if (query) {
      setExternalChatQuery(query);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#29201B]">
      {/* Sticky Header with navigation & contact actions */}
      <Header
        contact={siteData.contact}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenChat={handleOpenChat}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Portada / Hero */}
        <Hero
          schedule={siteData.schedule}
          onOpenChat={handleOpenChat}
        />

        {/* 2. Servicios */}
        <ServicesSection
          services={siteData.services}
          onOpenChat={handleOpenChat}
        />

        {/* 3. Información útil (Antes de realizar tu trámite) */}
        <UsefulInfoSection
          usefulDocs={siteData.usefulDocs}
          onOpenChat={handleOpenChat}
        />

        {/* 4. La Escribanía (Institucional) */}
        <AboutSection
          title={siteData.institutionalTitle}
          subtitle={siteData.institutionalSubtitle}
          pillars={siteData.institutionalPillars}
        />

        {/* 5. Preguntas Frecuentes */}
        <FaqSection
          faqs={siteData.faqs}
          onOpenChat={handleOpenChat}
        />

        {/* 6. Ubicación y Contacto */}
        <ContactSection
          contact={siteData.contact}
          schedule={siteData.schedule}
        />
      </main>

      {/* Footer */}
      <Footer
        contact={siteData.contact}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Intelligent Floating Chatbot */}
      <Chatbot
        siteData={siteData}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpen={() => setIsChatOpen(true)}
        externalQuery={externalChatQuery}
        onClearExternalQuery={() => setExternalChatQuery(null)}
      />

      {/* Admin Panel Modal (PIN 1414) */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        siteData={siteData}
        onSaveData={handleSaveData}
        onResetData={handleResetData}
      />
    </div>
  );
}
