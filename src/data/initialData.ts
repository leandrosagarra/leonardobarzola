import { NotarySiteData } from '../types';

export const INITIAL_NOTARY_DATA: NotarySiteData = {
  contact: {
    address: 'Calle 48 nº 874, primer piso oficina 24',
    phone: '0221 618-6574',
    whatsappNumber: '5492216186574',
    email: 'escribaniabarzola@gmail.com',
    city: 'La Plata, Buenos Aires',
    note: 'Atención presencial en horario de oficina sin necesidad de turno previo.',
  },
  schedule: {
    weekdays: '9:00 a 16:00',
    friday: '9:00 a 14:30',
    weekend: 'Cerrado',
  },
  institutionalTitle: 'Una atención cercana y profesional',
  institutionalSubtitle:
    'En la Escribanía nos comprometemos a brindar una atención personalizada, escuchando con dedicación cada consulta y orientando a cada persona de acuerdo con las particularidades de su trámite para que cada gestión sea transparente, ágil y segura.',
  institutionalPillars: [
    {
      id: 'personalizada',
      title: 'Atención personalizada',
      description: 'Cada cliente recibe orientación exclusiva y atenta de acuerdo con las características particulares de su trámite.',
    },
    {
      id: 'profesionalismo',
      title: 'Profesionalismo',
      description: 'Atención responsable, rigurosa y altamente especializada en cada una de las materias notariales.',
    },
    {
      id: 'claridad',
      title: 'Claridad',
      description: 'Información comprensible, sin tecnicismos innecesarios, para que conozcas con certeza cada instancia de tu trámite.',
    },
    {
      id: 'cercania',
      title: 'Cercanía',
      description: 'Un trato cordial y empático, especialmente fundamental en gestiones familiares y patrimoniales sensibles.',
    },
  ],
  services: [
    {
      id: 'escrituras',
      title: 'Escrituras',
      shortDesc: 'Compraventas inmobiliarias, donaciones, permutas y constitución de hipotecas.',
      fullDetails:
        'Confección, estudio de títulos y otorgamiento de escrituras públicas traslativas de dominio (compraventa de inmuebles urbanos y rurales, donaciones con reserva de usufructo, permutas), afectación a régimen de vivienda (ex bien de familia) y constitución de hipotecas u otros derechos reales.',
      requirements: [
        'Título de propiedad original antecedente',
        'DNI y constancia de CUIT/CUIL de transmitentes y adquirentes',
        'Estado parcelario o cédula catastral vigente',
        'Informes de dominio e inhibición (gestionados por la escribanía)',
        'Comprobantes de tasas o impuestos municipales/provinciales al día'
      ],
      icon: 'FileText',
    },
    {
      id: 'certificacion-firmas',
      title: 'Certificación de firmas',
      shortDesc: 'Autenticación de firmas en documentos privados para otorgarles validez legal.',
      fullDetails:
        'Intervención notarial que confiere fecha cierta y autenticidad a la suscripción de contratos de locación, convenios privados, autorizaciones y formularios oficiales. Se constata la identidad y capacidad de los firmantes en presencia del escribano.',
      requirements: [
        'DNI original y vigente del firmante',
        'Documento o contrato a firmar (sin firmas previas, se firma ante el escribano)',
        'Constancia de CUIT/CUIL si corresponde'
      ],
      icon: 'PenTool',
    },
    {
      id: 'poderes-actas',
      title: 'Poderes y Actas notariales',
      shortDesc: 'Redacción y formalización de poderes, constataciones de hechos y certificaciones con fe pública.',
      fullDetails:
        'Otorgamiento de facultades de representación legal mediante escritura pública (poderes especiales para trámites bancarios, administrativos o disposición, y poderes generales para juicios) y confección de actas notariales para constatar hechos, notificaciones fehacientes, declaraciones juradas o verificación de contenido digital.',
      requirements: [
        'DNI original y vigente del otorgante o requirente',
        'Nombres completos, DNI, CUIT y domicilio del apoderado (en poderes)',
        'Motivo y objeto de la representación o de la constatación notarial',
        'En poderes de disposición sobre bienes: título antecedente o datos registrales',
        'Coordinación previa para constataciones fuera de sede notarial'
      ],
      icon: 'ShieldCheck',
    },
    {
      id: 'apostillas',
      title: 'Legalizaciones y apostillas',
      shortDesc: 'Gestiones necesarias para documentación que deba tener validez en Argentina o en el extranjero.',
      fullDetails:
        'Tramitación de Apostillas del Convenio de La Haya y legalizaciones notariales ante el Colegio de Escribanos de la Provincia de Buenos Aires y Cancillería, posibilitando la validez internacional de partidas, poderes, autorizaciones de viaje de menores y títulos.',
      requirements: [
        'Documento original debidamente expedido o legalizado',
        'DNI de quien solicita la gestión',
        'Indicación precisa del país de destino para determinar apostilla o legalización consular'
      ],
      icon: 'Globe',
    },
    {
      id: 'libros',
      title: 'Autorización de libros',
      shortDesc: 'Trámites correspondientes a sociedades comerciales y entidades civiles.',
      fullDetails:
        'Rúbrica y certificación de apertura de libros de actas de asamblea y directorio, libros contables (diario, inventario y balances) y registros de accionistas o socios para SRL, SA, asociaciones civiles y fundaciones.',
      requirements: [
        'Estatuto social o contrato constitutivo inscripto (DPJ / IGJ)',
        'Acta de designación de autoridades vigente',
        'Libros en blanco o fojas móviles a intervenir',
        'DNI del representante legal'
      ],
      icon: 'BookOpen',
    },
    {
      id: 'testamentos',
      title: 'Testamentos y sucesiones',
      shortDesc: 'Asesoramiento y formalización de trámites vinculados con testamentos y procesos sucesorios.',
      fullDetails:
        'Asesoramiento preventivo en planificación sucesoria y redacción de testamentos por acto público con estricto resguardo de la porción legítima. Confección de cesiones de derechos hereditarios, inventarios notariales y particiones de herencia con adjudicación de bienes.',
      requirements: [
        'DNI original del testador',
        'Datos personales de dos testigos no beneficiarios (si aplica por modalidad)',
        'Títulos o referencias de los bienes a legar o particionar'
      ],
      icon: 'Award',
    },
  ],
  usefulDocs: [
    {
      id: 'dni',
      title: 'DNI vigente',
      description: 'Documento Nacional de Identidad en formato tarjeta física, actualizado y en óptimas condiciones.',
      icon: 'CreditCard',
    },
    {
      id: 'cuit',
      title: 'Constancia CUIT / CUIL',
      description: 'Comprobante oficial descargado de ANSES o AFIP para identificación tributaria.',
      icon: 'Hash',
    },
    {
      id: 'domicilio',
      title: 'Comprobante de domicilio',
      description: 'Servicio a tu nombre, impuesto o certificado de residencia actualizado.',
      icon: 'Home',
    },
    {
      id: 'antecedentes',
      title: 'Documentación del trámite',
      description: 'Títulos de propiedad antecedentes, planos, contratos previos o poderes según el acto a otorgar.',
      icon: 'FolderArchive',
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      question: '¿Qué documentación debo llevar?',
      answer:
        'La documentación depende del trámite. Entre los documentos que pueden resultar necesarios se encuentran DNI vigente, constancia de CUIT/CUIL, comprobantes de domicilio y antecedentes o títulos relacionados con la gestión.',
    },
    {
      id: 'faq-2',
      question: '¿Dónde está ubicada la escribanía?',
      answer: 'En calle 48 entre 12 y 13, La Plata, Provincia de Buenos Aires.',
    },
    {
      id: 'faq-3',
      question: '¿Cuáles son los horarios de atención?',
      answer:
        'De lunes a jueves de 9:00 a 16:00 y los viernes de 9:00 a 14:30. Los sábados y domingos la escribanía permanece cerrada.',
    },
    {
      id: 'faq-4',
      question: '¿Atienden los fines de semana?',
      answer:
        'La escribanía permanece cerrada los sábados y domingos.',
    },
    {
      id: 'faq-5',
      question: 'Tengo una consulta que no aparece en la web, ¿qué hago?',
      answer:
        'Podés utilizar el asistente virtual para buscar información dentro del sitio. Si tu situación requiere asesoramiento particular, el asistente te indicará cómo comunicarte directamente con la escribanía por teléfono o WhatsApp.',
    },
  ],
  customFacts: [
    'Ubicación exacta: Calle 48 nº 874, primer piso oficina 24, La Plata (entre calles 12 y 13).',
    'Horario: Lunes a jueves de 9:00 a 16:00. Viernes de 9:00 a 14:30. Sábados, domingos y feriados: cerrado.',
    'Teléfono y WhatsApp directo: 0221 618-6574.',
    'No hay turnero ni reserva online: la atención se brinda de manera directa.',
    'Los trámites de certificación de firmas requieren concurrir en persona con DNI vigente ante el escribano.',
  ],
};
