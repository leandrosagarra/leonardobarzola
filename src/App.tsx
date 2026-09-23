/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { INITIAL_NOTARY_DATA } from './data/initialData';
import { NotarySiteData } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { UsefulInfoSection } from './components/UsefulInfoSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Chatbot } from './components/Chatbot';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

const STORAGE_KEY = 'escribania_barzola_site_data';

function sanitizeSiteData(raw: any): NotarySiteData {
  if (!raw || typeof raw !== 'object') {
    return INITIAL_NOTARY_DATA;
  }
  return {
    ...INITIAL_NOTARY_DATA,
    ...raw,
    contact: {
      ...INITIAL_NOTARY_DATA.contact,
      ...(raw.contact || {}),
      address: (!raw.contact?.address || raw.contact.address.includes('entre 12 y 13'))
        ? INITIAL_NOTARY_DATA.contact.address
        : raw.contact.address,
    },
    schedule: {
      ...INITIAL_NOTARY_DATA.schedule,
      ...(raw.schedule || {}),
    },
    institutionalTitle: raw.institutionalTitle || INITIAL_NOTARY_DATA.institutionalTitle,
    institutionalSubtitle: typeof raw.institutionalSubtitle === 'string'
      ? raw.institutionalSubtitle.replace('En Escribanía Barzola', 'En la Escribanía')
      : INITIAL_NOTARY_DATA.institutionalSubtitle,
    institutionalPillars: Array.isArray(raw.institutionalPillars) && raw.institutionalPillars.length > 0
      ? raw.institutionalPillars
      : INITIAL_NOTARY_DATA.institutionalPillars,
    services: (() => {
      if (!Array.isArray(raw.services) || raw.services.length === 0) {
        return INITIAL_NOTARY_DATA.services;
      }
      const hasOldSplit = raw.services.some(
        (s: any) => s.id === 'poderes' || s.id === 'actas' || s.title === 'Poderes notariales' || s.title === 'Actas notariales'
      );
      if (hasOldSplit) {
        return INITIAL_NOTARY_DATA.services;
      }
      return raw.services;
    })(),
    faqs: Array.isArray(raw.faqs) && raw.faqs.length > 0
      ? raw.faqs
      : INITIAL_NOTARY_DATA.faqs,
    usefulDocs: Array.isArray(raw.usefulDocs) && raw.usefulDocs.length > 0
      ? raw.usefulDocs
      : INITIAL_NOTARY_DATA.usefulDocs,
    customFacts: Array.isArray(raw.customFacts)
      ? raw.customFacts
      : INITIAL_NOTARY_DATA.customFacts,
  };
}

export default function App() {
  const [siteData, setSiteData] = useState<NotarySiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const sanitized = sanitizeSiteData(parsed);
        // Persist clean sanitized version back if needed
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
        } catch {
          // ignore
        }
        return sanitized;
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
    <ErrorBoundary>
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

          {/* 5. Ubicación y Contacto */}
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
    </ErrorBoundary>
  );
}
