import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  Save,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  Building,
  Clock,
  FileText,
  HelpCircle,
  Brain,
  Shield,
} from 'lucide-react';
import { NotarySiteData, ServiceItem } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteData: NotarySiteData;
  onSaveData: (newData: NotarySiteData) => void;
  onResetData: () => void;
}

const CORRECT_PIN = '1414';

export function AdminModal({
  isOpen,
  onClose,
  siteData,
  onSaveData,
  onResetData,
}: AdminModalProps) {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'services' | 'institution' | 'chatbot'>('contact');

  // Working copy of data
  const [formData, setFormData] = useState<NotarySiteData>(siteData);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync formData when siteData changes or modal opens
  React.useEffect(() => {
    setFormData(siteData);
  }, [siteData, isOpen]);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === CORRECT_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleSave = () => {
    onSaveData(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que querés restablecer todos los datos a la configuración inicial original?')) {
      onResetData();
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-[#FCFBF9] border border-[#D9CCBA] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#382C25] text-[#FAF6F0] px-6 py-4 flex items-center justify-between border-b border-[#4E3F36] shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo Escribanía"
              className="w-9 h-9 rounded-full object-cover border border-[#C5A059]"
            />
            <div>
              <h2 className="font-serif-title text-base sm:text-lg font-semibold text-[#FAF7F2]">
                Panel de Administración · Escribanía Barzola
              </h2>
              <p className="text-xs text-[#DECBB7]">
                Gestión de contenidos y base de conocimiento del asistente
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs text-[#D9C8B5] hover:text-white px-2 py-1 rounded-md hover:bg-[#4C3D34] transition-colors"
              >
                Cerrar sesión
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#D9C8B5] hover:text-white hover:bg-[#4C3D34] rounded-md transition-colors"
              aria-label="Cerrar panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* PIN Gate */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-full bg-[#F5ECE0] border border-[#E5DACB] flex items-center justify-center mb-5 text-[#9A4E38]">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="font-serif-title text-2xl font-semibold text-[#2B211C] mb-2">
              Acceso protegido por PIN
            </h3>
            <p className="text-sm text-[#5F4E43] mb-6">
              Ingresá el PIN numérico de seguridad para acceder a la configuración de la escribanía y del asistente virtual.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError(false);
                  }}
                  placeholder="PIN de 4 dígitos"
                  className="w-full text-center text-2xl tracking-[0.5em] font-mono py-3 px-4 bg-white rounded-xl border border-[#D5C6B3] focus:outline-hidden focus:border-[#9A4E38] focus:ring-1 focus:ring-[#9A4E38]"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-[#B93826] mt-2 font-medium">
                    PIN incorrecto. Por favor, intentá nuevamente.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#3C3029] hover:bg-[#28201B] text-[#FAF6F0] font-semibold text-sm transition-colors shadow-xs"
              >
                Ingresar al panel
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#EFE7DC] w-full text-xs text-[#8E796A]">
              Escribanía Barzola · Panel exclusivo de gestión
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex border-b border-[#E7DED0] bg-[#FAF6F0] overflow-x-auto scrollbar-none px-4 pt-2 gap-1 shrink-0">
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors border-t border-x ${
                  activeTab === 'contact'
                    ? 'bg-[#FCFBF9] text-[#29201B] border-[#D9CCBA] border-b-transparent -mb-px'
                    : 'text-[#6D5A4D] hover:text-[#29201B] border-transparent'
                }`}
              >
                <Building className="w-4 h-4 text-[#9A4E38]" />
                <span>Contacto y Horarios</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors border-t border-x ${
                  activeTab === 'services'
                    ? 'bg-[#FCFBF9] text-[#29201B] border-[#D9CCBA] border-b-transparent -mb-px'
                    : 'text-[#6D5A4D] hover:text-[#29201B] border-transparent'
                }`}
              >
                <FileText className="w-4 h-4 text-[#9A4E38]" />
                <span>Servicios</span>
              </button>

              <button
                onClick={() => setActiveTab('institution')}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors border-t border-x ${
                  activeTab === 'institution'
                    ? 'bg-[#FCFBF9] text-[#29201B] border-[#D9CCBA] border-b-transparent -mb-px'
                    : 'text-[#6D5A4D] hover:text-[#29201B] border-transparent'
                }`}
              >
                <Clock className="w-4 h-4 text-[#9A4E38]" />
                <span>Institucional</span>
              </button>

              <button
                onClick={() => setActiveTab('chatbot')}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors border-t border-x ${
                  activeTab === 'chatbot'
                    ? 'bg-[#FCFBF9] text-[#29201B] border-[#D9CCBA] border-b-transparent -mb-px'
                    : 'text-[#6D5A4D] hover:text-[#29201B] border-transparent'
                }`}
              >
                <Brain className="w-4 h-4 text-[#9A4E38]" />
                <span>Base del Chatbot</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* TAB: CONTACT & SCHEDULES */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif-title text-lg font-semibold text-[#29201B] mb-1">
                      Información de contacto
                    </h3>
                    <p className="text-xs text-[#6F5D51]">
                      Esta información se muestra en la web y es utilizada por el chatbot para informar a los clientes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#735F52] mb-1">
                        Dirección física
                      </label>
                      <input
                        type="text"
                        value={formData.contact.address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, address: e.target.value },
                          })
                        }
                        className="w-full text-sm py-2 px-3 bg-white rounded-lg border border-[#D5C6B3] focus:border-[#9A4E38]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#735F52] mb-1">
                        Ciudad y provincia
                      </label>
                      <input
                        type="text"
                        value={formData.contact.city}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, city: e.target.value },
                          })
                        }
                        className="w-full text-sm py-2 px-3 bg-white rounded-lg border border-[#D5C6B3] focus:border-[#9A4E38]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#735F52] mb-1">
                        Teléfono
                      </label>
                      <input
                        type="text"
                        value={formData.contact.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, phone: e.target.value },
                          })
                        }
                        className="w-full text-sm py-2 px-3 bg-white rounded-lg border border-[#D5C6B3] focus:border-[#9A4E38]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#735F52] mb-1">
                        Número de WhatsApp (con código de país)
                      </label>
                      <input
                        type="text"
                        value={formData.contact.whatsappNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, whatsappNumber: e.target.value },
                          })
                        }
                        className="w-full text-sm py-2 px-3 bg-white rounded-lg border border-[#D5C6B3] focus:border-[#9A4E38]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase text-[#735F52] mb-1">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        value={formData.contact.email || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, email: e.target.value },
                          })
                        }
                        className="w-full text-sm py-2 px-3 bg-white rounded-lg border border-[#D5C6B3] focus:border-[#9A4E38]"
                        placeholder="ejemplo@escribaniabarzola.com"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#EAE0D1]">
                    <h3 className="font-serif-title text-lg font-semibold text-[#29201B] mb-1">
                      Horarios de atención
                    </h3>
                    <p className="text-xs text-[#6F5D51] mb-4">
                      Definí los días y horas de atención al público.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-[#735F52] mb-1">
                          Lunes a jueves
                        </label>
                        <input
                          type="text"
                          value={formData.schedule.weekdays}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              schedule: { ...formData.schedule, weekdays: e.target.value },
                            })
                          }
                          className="w-full text-sm py-2 px-3 bg-white rounded-lg border border-[#D5C6B3] focus:border-[#9A4E38]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-[#735F52] mb-1">
                          Viernes
                        </label>
                        <input
                          type="text"
                          value={formData.schedule.friday}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              schedule: { ...formData.schedule, friday: e.target.value },
                            })
                          }
                          className="w-full text-sm py-2 px-3 bg-white rounded-lg border border-[#D5C6B3] focus:border-[#9A4E38]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-[#735F52] mb-1">
                          Sábados y domingos
                        </label>
                        <input
                          type="text"
                          value={formData.schedule.weekend}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              schedule: { ...formData.schedule, weekend: e.target.value },
                            })
                          }
                          className="w-full text-sm py-2 px-3 bg-white rounded-lg border border-[#D5C6B3] focus:border-[#9A4E38]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SERVICES */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif-title text-lg font-semibold text-[#29201B] mb-1">
                      Servicios notariales
                    </h3>
                    <p className="text-xs text-[#6F5D51]">
                      Editá los títulos, descripciones resumidas y detalles de cada trámite.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {(formData?.services || []).map((srv, idx) => (
                      <div
                        key={srv.id}
                        className="p-4 bg-white rounded-xl border border-[#DFCEBB] shadow-2xs space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#9A4E38]">
                            Servicio #{idx + 1}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-[#655246] mb-1">
                              Título del servicio
                            </label>
                            <input
                              type="text"
                              value={srv.title}
                              onChange={(e) => {
                                const newServices = [...formData.services];
                                newServices[idx].title = e.target.value;
                                setFormData({ ...formData, services: newServices });
                              }}
                              className="w-full text-sm py-1.5 px-3 bg-[#FAF8F5] rounded-md border border-[#D5C6B3]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#655246] mb-1">
                              Descripción breve
                            </label>
                            <input
                              type="text"
                              value={srv.shortDesc}
                              onChange={(e) => {
                                const newServices = [...formData.services];
                                newServices[idx].shortDesc = e.target.value;
                                setFormData({ ...formData, services: newServices });
                              }}
                              className="w-full text-sm py-1.5 px-3 bg-[#FAF8F5] rounded-md border border-[#D5C6B3]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#655246] mb-1">
                            Información detallada desplegable
                          </label>
                          <textarea
                            rows={3}
                            value={srv.fullDetails}
                            onChange={(e) => {
                              const newServices = [...formData.services];
                              newServices[idx].fullDetails = e.target.value;
                              setFormData({ ...formData, services: newServices });
                            }}
                            className="w-full text-sm py-2 px-3 bg-[#FAF8F5] rounded-md border border-[#D5C6B3]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: INSTITUTION */}
              {activeTab === 'institution' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif-title text-lg font-semibold text-[#29201B] mb-1">
                      Información institucional
                    </h3>
                    <p className="text-xs text-[#6F5D51]">
                      Propuesta de valor y los 4 pilares de Escribanía Barzola.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#735F52] mb-1">
                        Título de la sección
                      </label>
                      <input
                        type="text"
                        value={formData.institutionalTitle}
                        onChange={(e) =>
                          setFormData({ ...formData, institutionalTitle: e.target.value })
                        }
                        className="w-full text-sm py-2 px-3 bg-white rounded-lg border border-[#D5C6B3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#735F52] mb-1">
                        Texto explicativo
                      </label>
                      <textarea
                        rows={3}
                        value={formData.institutionalSubtitle}
                        onChange={(e) =>
                          setFormData({ ...formData, institutionalSubtitle: e.target.value })
                        }
                        className="w-full text-sm py-2 px-3 bg-white rounded-lg border border-[#D5C6B3]"
                      />
                    </div>

                    <div className="pt-3 border-t border-[#EAE0D1]">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8C7666] mb-3">
                        Los 4 pilares de atención
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(formData?.institutionalPillars || []).map((pillar, idx) => (
                          <div key={pillar.id} className="p-3.5 bg-white rounded-lg border border-[#D5C6B3] space-y-2">
                            <input
                              type="text"
                              value={pillar.title}
                              onChange={(e) => {
                                const newPillars = [...(formData?.institutionalPillars || [])];
                                newPillars[idx].title = e.target.value;
                                setFormData({ ...formData, institutionalPillars: newPillars });
                              }}
                              className="w-full font-semibold text-xs text-[#2A201B] bg-[#FAF8F5] p-1.5 rounded-md border border-[#E3D6C5]"
                            />
                            <textarea
                              rows={2}
                              value={pillar.description}
                              onChange={(e) => {
                                const newPillars = [...(formData?.institutionalPillars || [])];
                                newPillars[idx].description = e.target.value;
                                setFormData({ ...formData, institutionalPillars: newPillars });
                              }}
                              className="w-full text-xs text-[#5C4C42] bg-[#FAF8F5] p-1.5 rounded-md border border-[#E3D6C5]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: CHATBOT KNOWLEDGE BASE */}
              {activeTab === 'chatbot' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif-title text-lg font-semibold text-[#29201B] mb-1">
                      Base de conocimiento del Chatbot inteligente
                    </h3>
                    <p className="text-xs text-[#6F5D51]">
                      Agregá hechos adicionales o pautas de respuesta específicas. El asistente utiliza estos datos para responder consultas en lenguaje natural sin inventar información.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {(formData?.customFacts || []).map((fact, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={fact}
                          onChange={(e) => {
                            const newFacts = [...formData.customFacts];
                            newFacts[idx] = e.target.value;
                            setFormData({ ...formData, customFacts: newFacts });
                          }}
                          className="flex-1 text-sm py-2 px-3 bg-white rounded-lg border border-[#D5C6B3] focus:border-[#9A4E38]"
                        />
                        <button
                          onClick={() => {
                            setFormData({
                              ...formData,
                              customFacts: formData.customFacts.filter((_, i) => i !== idx),
                            });
                          }}
                          className="p-2 text-[#B93826] hover:bg-[#FCEAE7] rounded-lg transition-colors"
                          title="Eliminar hecho"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        setFormData({
                          ...formData,
                          customFacts: [...formData.customFacts, 'Nuevo hecho o información útil para el asistente...'],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#EFE7DC] hover:bg-[#E4DCCE] text-xs font-semibold text-[#3D2F27] border border-[#D4C5B3]"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#9A4E38]" />
                      <span>Agregar dato al chatbot</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#DFCEBB] text-xs text-[#5D4C42] space-y-2">
                    <div className="font-semibold text-[#33251D] flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-[#9A4E38]" />
                      <span>Regla fundamental aplicada por el asistente:</span>
                    </div>
                    <p className="leading-relaxed">
                      El asistente tiene estrictamente prohibido inventar costos, honorarios, impuestos o plazos no especificados. Si no cuenta con información suficiente, responderá:
                      <em className="block mt-1 font-serif-title text-[#2A201B]">
                        «Ese caso requiere una consulta particular con la escribanía. Podés comunicarte directamente para recibir asesoramiento.»
                      </em>
                      y ofrecerá automáticamente botones para llamar por teléfono o consultar por WhatsApp.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer with Actions */}
            <div className="bg-[#FAF6F0] px-6 py-4 border-t border-[#E7DED0] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-[#8A7565] hover:text-[#2A201B] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer valores originales</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {saveSuccess && (
                  <span className="text-xs font-semibold text-[#2B5E3F] flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    ¡Guardado correctamente!
                  </span>
                )}

                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-[#D5C6B3] bg-white text-xs font-semibold text-[#4F3F34] hover:bg-[#F7F3EB] transition-colors"
                >
                  Cerrar
                </button>

                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#3C3029] hover:bg-[#28201B] text-[#FAF6F0] text-xs font-semibold transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5 text-[#DFCBB6]" />
                  <span>Guardar cambios</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
