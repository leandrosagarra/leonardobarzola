import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const PORT = 3000;

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Fallback rule-based matching function for guaranteed resilience
function generateFallbackResponse(userMessage: string, knowledge: any): { reply: string; requiresContact: boolean } {
  const text = (userMessage || "").toLowerCase().trim();

  // Explicit hours / schedule checks
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

  // Location / Address
  if (text.includes("dónde") || text.includes("donde") || text.includes("queda") || text.includes("dirección") || text.includes("direccion") || text.includes("ubicación") || text.includes("ubicacion") || text.includes("calle")) {
    return {
      reply: `Estamos ubicados en ${knowledge?.contact?.address || "Calle 48 nº 874, primer piso oficina 24, La Plata, Buenos Aires"}. Podés ver el mapa interactivo en la sección de contacto o pulsar 'Cómo llegar'.`,
      requiresContact: false
    };
  }

  // Phone / WhatsApp / Email / Contact
  if (text.includes("teléfono") || text.includes("telefono") || text.includes("celular") || text.includes("whatsapp") || text.includes("contacto") || text.includes("llamar") || text.includes("comunicarme") || text.includes("correo") || text.includes("email") || text.includes("mail")) {
    return {
      reply: `Podés comunicarte telefónicamente al ${knowledge?.contact?.phone || "0221 618-6574"} o escribirnos por correo electrónico a ${knowledge?.contact?.email || "escribaniabarzola@gmail.com"}.`,
      requiresContact: true
    };
  }

  // Certificación de firmas
  if (text.includes("certific") || text.includes("firma") || text.includes("autentic")) {
    return {
      reply: "Realizamos certificación de firmas para otorgar validez legal y fecha cierta a documentos privados. Por lo general se requiere presentar DNI vigente y concurrir a firmar en persona ante el escribano.",
      requiresContact: false
    };
  }

  // Poderes
  if (text.includes("poder") || text.includes("apoderado")) {
    return {
      reply: "Formalizamos poderes notariales tanto generales como especiales (para trámites administrativos, bancarios, judiciales o de disposición). Es necesario concurrir con DNI y los datos completos de la persona a apoderar.",
      requiresContact: false
    };
  }

  // Escrituras / compraventa / propiedad / donacion / hipoteca
  if (text.includes("escritura") || text.includes("vender") || text.includes("compre") || text.includes("compré") || text.includes("compra") || text.includes("propiedad") || text.includes("inmueble") || text.includes("casa") || text.includes("departamento") || text.includes("terreno") || text.includes("lote") || text.includes("donaci") || text.includes("hipoteca")) {
    return {
      reply: "Gestionamos escrituras de compraventas inmobiliarias, donaciones, permutas y constitución de hipotecas. Si vendiste o vas a adquirir un inmueble, se requerirá el título de propiedad antecedente, DNI de las partes y estado parcelario o informes de dominio según corresponda.",
      requiresContact: false
    };
  }

  // Apostillas / legalizaciones
  if (text.includes("apostilla") || text.includes("legaliz") || text.includes("viaje") || text.includes("exterior") || text.includes("extranjero") || text.includes("haya")) {
    return {
      reply: "Gestionamos legalizaciones y apostillas de La Haya para que tus documentos notariales o personales cuenten con plena validez tanto en Argentina como en el exterior.",
      requiresContact: false
    };
  }

  // Sucesiones / testamento
  if (text.includes("sucesi") || text.includes("testamento") || text.includes("herencia") || text.includes("fallec")) {
    return {
      reply: "Brindamos asesoramiento notarial y formalización de testamentos por acto público, así como el acompañamiento en las instancias notariales vinculadas a procesos sucesorios y particiones.",
      requiresContact: false
    };
  }

  // Actas notariales
  if (text.includes("acta") || text.includes("constataci") || text.includes("notificaci") || text.includes("declaraci")) {
    return {
      reply: "Realizamos actas notariales de comprobación de hechos, presencia, intimación, declaraciones juradas y constataciones de contenido físico o digital con plena fe pública.",
      requiresContact: false
    };
  }

  // Autorización de libros
  if (text.includes("libro") || text.includes("sociedad") || text.includes("rubric") || text.includes("comercial") || text.includes("asociaci") || text.includes("entidad civil")) {
    return {
      reply: "Realizamos trámites de apertura y certificación de libros de actas, registro de socios y libros contables para sociedades comerciales y entidades civiles.",
      requiresContact: false
    };
  }

  // Documentación general / que llevar
  if (text.includes("document") || text.includes("llevar") || text.includes("requisito") || text.includes("necesito")) {
    return {
      reply: "Cada trámite tiene requisitos particulares, pero como base se suele solicitar: DNI vigente, constancia de CUIT/CUIL, comprobante de domicilio y los antecedentes o títulos relacionados con la gestión. Si tenés dudas sobre tu trámite específico, podemos asesorarte en detalle.",
      requiresContact: false
    };
  }

  // Price / Cost / Fee / Taxes / Complex inquiry -> STRICT FUNDAMENTAL RULE
  return {
    reply: "Ese caso requiere una consulta particular con la escribanía. Podés comunicarte directamente para recibir asesoramiento.",
    requiresContact: true
  };
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "5mb" }));

  // API Health Check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      geminiConfigured: !!process.env.GEMINI_API_KEY,
      timestamp: new Date().toISOString(),
    });
  });

  // Chatbot intelligent endpoint
  app.post("/api/chat", async (req, res) => {
    const { message, history = [], knowledge = {} } = req.body || {};

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Mensaje requerido" });
      return;
    }

    const ai = getGeminiClient();

    // Prepare system instructions and knowledge grounding
    const knowledgeText = `
INFORMACIÓN OFICIAL DE ESCRIBANÍA BARZOLA:
- Nombre: Escribanía Barzola
- Subtítulo: Servicios notariales · La Plata
- Ubicación / Dirección: ${knowledge?.contact?.address || "Calle 48 nº 874, primer piso oficina 24, La Plata, Provincia de Buenos Aires, Argentina"}
- Teléfono: ${knowledge?.contact?.phone || "0221 618-6574"}
- WhatsApp: ${knowledge?.contact?.phone || "0221 618-6574"}
- Correo electrónico: ${knowledge?.contact?.email || "escribaniabarzola@gmail.com"}
- Horarios de atención:
  * Lunes a jueves: ${knowledge?.schedule?.weekdays || "9:00 a 16:00"}
  * Viernes: ${knowledge?.schedule?.friday || "9:00 a 14:30"}
  * Sábados y domingos: Cerrado.
  * Feriados: Cerrado.
- Servicios notariales que brinda:
  1. Escrituras: Compraventas inmobiliarias, donaciones, permutas y constitución de hipotecas.
  2. Certificación de firmas: Autenticación de firmas en documentos privados para otorgarles validez legal.
  3. Poderes y Actas notariales: Redacción y formalización de poderes generales o especiales, y confección de actas de constatación de hechos y certificaciones con fe pública.
  4. Legalizaciones y apostillas: Gestiones necesarias para documentación que deba tener validez en Argentina o en el extranjero (Apostilla de La Haya).
  5. Autorización de libros: Trámites correspondientes a sociedades comerciales y entidades civiles.
  6. Testamentos y sucesiones: Asesoramiento y formalización de trámites vinculados con testamentos y procesos sucesorios.
- Documentación habitual previa a un trámite: DNI vigente, constancia de CUIT/CUIL, comprobante de domicilio y títulos o antecedentes pertinentes.
- Datos adicionales cargados por la escribanía:
  ${knowledge?.customFacts ? knowledge.customFacts.join("\n") : "Atención personalizada y asesoramiento responsable en La Plata."}

REGLAS ABSOLUTAS QUE DEBÉS CUMPLIR (SIN EXCEPCIÓN):
1. Respondé siempre de manera breve, clara, cordial y accesible para cualquier persona, sin utilizar lenguaje jurídico innecesariamente complejo. Hablá en tono argentino cordial y profesional ("podés", "necesitás", "te esperamos").
2. REGLA FUNDAMENTAL: No inventes información. No inventes requisitos, documentación, costos, honorarios, impuestos, plazos, procedimientos ni interpretaciones jurídicas.
3. Si la información disponible en los datos de arriba no es suficiente para responder con total seguridad, o si te consultan por costos, honorarios exactos, valuaciones fiscales, o un caso judicial/familiar específico complejo, debés responder exactamente:
"Ese caso requiere una consulta particular con la escribanía. Podés comunicarte directamente para recibir asesoramiento."
4. Recordá que la escribanía NO tiene turnero ni sistema de turnos online. La atención o consultas se canalizan visitando la escribanía en los horarios de atención, llamando por teléfono o escribiendo a escribaniabarzola@gmail.com.
5. Nunca des consejos legales concluyentes ni reemplaces el criterio del escribano. Tu rol es de orientación e información.
`;

    if (!ai) {
      // Use resilient rule-based engine if no API key is provided
      const fallback = generateFallbackResponse(message, knowledge);
      res.json({
        reply: fallback.reply,
        requiresContact: fallback.requiresContact,
        source: "local-engine",
      });
      return;
    }

    try {
      // Build conversation contents for Gemini
      const conversationHistory = (history || [])
        .slice(-6)
        .map((item: any) => ({
          role: item.role === "user" ? "user" : "model",
          parts: [{ text: item.text || item.content || "" }],
        }));

      const contents = [
        ...conversationHistory,
        {
          role: "user",
          parts: [{ text: message }],
        },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: knowledgeText,
          temperature: 0.2, // Low temperature for high precision and compliance with fundamental rules
        },
      });

      const replyText = response.text?.trim() || "";
      const isFallbackPhrase = replyText.includes("Ese caso requiere una consulta particular") ||
                               replyText.includes("comunicarte directamente para recibir asesoramiento");

      res.json({
        reply: replyText || "Ese caso requiere una consulta particular con la escribanía. Podés comunicarte directamente para recibir asesoramiento.",
        requiresContact: isFallbackPhrase,
        source: "gemini-3.8-flash",
      });
    } catch (err: any) {
      console.error("Gemini API error, falling back to rule engine:", err?.message);
      const fallback = generateFallbackResponse(message, knowledge);
      res.json({
        reply: fallback.reply,
        requiresContact: fallback.requiresContact,
        source: "local-fallback",
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Escribanía Barzola server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
