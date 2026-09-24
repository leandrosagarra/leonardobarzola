export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDetails: string;
  requirements?: string[];
  icon: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  whatsappNumber: string;
  email?: string;
  city: string;
  note?: string;
}

export interface ScheduleInfo {
  weekdays: string;
  friday: string;
  weekend: string;
}

export interface InstitutionalPillar {
  id: string;
  title: string;
  description: string;
}

export interface UsefulDocItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface NotarySiteData {
  contact: ContactInfo;
  schedule: ScheduleInfo;
  institutionalTitle: string;
  institutionalSubtitle: string;
  institutionalPillars: InstitutionalPillar[];
  services: ServiceItem[];
  faqs: FaqItem[];
  usefulDocs: UsefulDocItem[];
  customFacts: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  requiresContact?: boolean;
}
