import type { IncomingMessage, ServerResponse } from "http";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }
  return aiClient;
}

function generateFallbackResponse(userMessage: string, knowledge: any): { reply: string; requiresContact: boolean } {
  const text = (userMessage || "").toLowerCase().trim();

  if (text.includes("horario") || text.includes("hora") || text.includes("atienden") || text.includes("abren") || text.includes("viernes") || text.includes("sábado") || text.includes("domingo") || text.includes("feriado")) {
    if (text.includes("sábado") || text.includes("sabado") || text.includes("domingo") || text.includes("fin de semana")) {
      return {
        reply: "La escribanía permanece cerrada los sábados y domingos. Atendemos de lunes a jueves de 9:00 a 16:00 y los viernes de 9:00 a 14:30.",
        requiresContact: false
      };
    }
    if (text.includes("viernes")) {
      return {
        reply: "Los viernes atendemos de 9:00 a 14:30. De lunes a jueves nuestro horario es de 9:00 a 16:00.",
        requiresContact: false
      };
    }
    return {
      reply: `Nuestros horarios de atención son: de lunes a jueves de ${knowledge?.schedule?.weekdays || "9:00 a 16:00"} y los viernes de ${knowledge?.schedule?.friday || "9:00 a 14:30"}. Sábados y domingos: cerrado.`,
      requiresContact: false
    };
  }

  if (text.includes("dónde") || text.includes("donde") || text.includes("queda") || text.includes("dirección") || text.includes("direccion") || text.includes("ubicación") || text.includes("ubicacion") || text.includes("calle")) {
    return {
      reply: `Estamos ubicados en ${knowledge?.contact?.address || "Calle 48 nº 874, primer piso oficina 24, La Plata, Buenos Aires"}. Podés ver el mapa interactivo en la sección de contacto o pulsar 'Cómo llegar'.`,
      requiresContact: false
    };
  }

  if (text.includes("teléfono") || text.includes("telefono") || text.includes("celular") || text.includes("whatsapp") || text.includes("contacto") || text.includes("llamar") || text.includes("comunicarme")) {
    return {
      reply: `Podés comunicarte telefónicamente al ${knowledge?.contact?.phone || "0221 618-6574"} o escribirnos por WhatsApp al mismo número.`,
      requiresContact: true
    };
  }

  if (text.includes("certific") || text.includes("firma") || text.includes("autentic")) {
    return {
      reply: "Realizamos certificación de firmas para otorgar validez legal y fecha cierta a documentos privados. Por lo general se requiere presentar DNI vigente y concurrir a firmar en persona ante el escribano.",
      requiresContact: false
    };
  }

  if (text.includes("poder") || text.includes("autoriz") || text.includes("viaje") || text.includes("menor")) {
    return {
      reply: "Formalizamos poderes notariales (generales o especiales) y autorizaciones de viaje para menores. Para viajes al exterior se solicita partida de nacimiento del menor actualizada y DNI de los progenitores.",
      requiresContact: false
    };
  }

  if (text.includes("escritura") || text.includes("comprar") || text.includes("vender") || text.includes("propiedad") || text.includes("inmueble") || text.includes("donaci")) {
    return {
      reply: "Efectuamos escrituración de compraventas, donaciones y reglamentos. Se realiza el estudio de títulos, verificación registral e impositiva para brindar máxima seguridad jurídica.",
      requiresContact: false
    };
  }

  if (text.includes("turno") || text.includes("cita") || text.includes("sacar turno")) {
    return {
      reply: "No es necesario solicitar turno previo. La atención se brinda presencialmente por orden de llegada en nuestro horario habitual.",
      requiresContact: false
    };
  }

  return {
    reply: "Ese caso requiere una consulta particular con la escribanía. Podés comunicarte directamente para recibir asesoramiento.",
    requiresContact: true
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, knowledge } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "El mensaje es requerido." });
  }

  const ai = getGeminiClient();
  if (!ai) {
    const fallback = generateFallbackResponse(message, knowledge);
    return res.status(200).json({
      reply: fallback.reply,
      requiresContact: fallback.requiresContact,
      source: "local-fallback",
    });
  }

  try {
    const knowledgeText = `
INFORMACIÓN OFICIAL DE ESCRIBANÍA BARZOLA:
- Nombre: Escribanía Barzola
- Subtítulo: Servicios notariales · La Plata
- Ubicación / Dirección: ${knowledge?.contact?.address || "Calle 48 nº 874, primer piso oficina 24, La Plata, Provincia de Buenos Aires, Argentina"}
- Teléfono: ${knowledge?.contact?.phone || "0221 618-6574"}
- WhatsApp: ${knowledge?.contact?.phone || "0221 618-6574"}
- Horarios de atención:
  * Lunes a jueves: ${knowledge?.schedule?.weekdays || "9:00 a 16:00"}
  * Viernes: ${knowledge?.schedule?.friday || "9:00 a 14:30"}
  * Sábados y domingos: Cerrado.
  * Feriados: Cerrado.
- Modalidad de atención:
  * Atención presencial directa sin turnero.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [{ role: "user", parts: [{ text: message }] }],
      config: {
        systemInstruction: knowledgeText,
        temperature: 0.2,
      },
    });

    const replyText = response.text?.trim() || "";
    const isFallbackPhrase = replyText.includes("Ese caso requiere una consulta particular") ||
                             replyText.includes("comunicarte directamente para recibir asesoramiento");

    return res.status(200).json({
      reply: replyText || "Ese caso requiere una consulta particular con la escribanía. Podés comunicarte directamente para recibir asesoramiento.",
      requiresContact: isFallbackPhrase,
      source: "gemini-3.8-flash",
    });
  } catch (err: any) {
    const fallback = generateFallbackResponse(message, knowledge);
    return res.status(200).json({
      reply: fallback.reply,
      requiresContact: fallback.requiresContact,
      source: "local-fallback",
    });
  }
}
