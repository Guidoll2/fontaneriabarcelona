"use client";
import React, { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

type FormData = {
  nombre: string;
  telefono: string;
  poblacion: string;
  tiposPiscina?: string;
  mensaje?: string;
  // Honeypot
  fax?: string;
};

type FormErrors = {
  nombre?: string;
  telefono?: string;
  poblacion?: string;
};

export default function LeadFormClorador({ locale = "es" }: { locale?: string }) {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    telefono: "",
    poblacion: "",
    tiposPiscina: "",
    mensaje: "",
    fax: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  // Traducciones simples
  const t = {
    nombre: locale === "ca" ? "Nom" : locale === "en" ? "Name" : "Nombre",
    telefono: locale === "ca" ? "Telèfon" : locale === "en" ? "Phone" : "Teléfono",
    poblacion: locale === "ca" ? "Població" : locale === "en" ? "City" : "Población",
    tipoPiscina: locale === "ca" ? "Mida piscina (opcional)" : locale === "en" ? "Pool size (optional)" : "Tamaño piscina (opcional)",
    mensaje: locale === "ca" ? "Comentaris" : locale === "en" ? "Comments" : "Comentarios",
    enviar: locale === "ca" ? "Sol·licitar Pressupost" : locale === "en" ? "Request Quote" : "Solicitar presupuesto",
    enviando: locale === "ca" ? "Enviant..." : locale === "en" ? "Sending..." : "Enviando...",
    exito: locale === "ca" ? "Rebut!" : locale === "en" ? "Received!" : "¡Recibido!",
    exitoMsg: locale === "ca" ? "T'enumerarem aviat." : locale === "en" ? "We'll call you soon." : "Te llamamos pronto para coordinar la visita.",
    error: locale === "ca" ? "Error" : locale === "en" ? "Error" : "Error",
    errorMsg: locale === "ca" ? "Torna-ho a intentar." : locale === "en" ? "Try again." : "Inténtalo de nuevo.",
  };

  function validateField(name: string, value: string) {
    const newErrors = { ...errors };

    if (name === "nombre") {
      if (!value.trim()) {
        newErrors.nombre = "El nombre es obligatorio";
      } else if (value.trim().length < 2) {
        newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
      } else {
        delete newErrors.nombre;
      }
    }

    if (name === "telefono") {
      if (!value.trim()) {
        newErrors.telefono = "El teléfono es obligatorio";
      } else if (!/^[0-9+\s()-]{9,}$/.test(value)) {
        newErrors.telefono = "Formato de teléfono inválido";
      } else {
        delete newErrors.telefono;
      }
    }

    if (name === "poblacion") {
      if (!value.trim()) {
        newErrors.poblacion = "La población es obligatoria";
      } else if (value.trim().length < 2) {
        newErrors.poblacion = "La población debe tener al menos 2 caracteres";
      } else {
        delete newErrors.poblacion;
      }
    }

    setErrors(newErrors);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (touched.has(name)) {
      validateField(name, value);
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setTouched(new Set(touched).add(name));
    validateField(name, value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Honeypot check
    if (form.fax) {
      console.log("Bot detected");
      return;
    }

    // Validar todos los campos
    const requiredFields = ["nombre", "telefono", "poblacion"];
    const newTouched = new Set(requiredFields);
    setTouched(newTouched);

    requiredFields.forEach(field => {
      validateField(field, form[field as keyof FormData] as string);
    });

    // Verificar si hay errores
    const hasErrors = requiredFields.some(field => {
      const value = form[field as keyof FormData] as string;
      return !value || value.trim().length === 0;
    });

    if (hasErrors || Object.keys(errors).length > 0) {
      return;
    }

    setSending(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/clorador-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "landing-clorador-salino",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Error en el servidor");

      // ✅ TRACKING GOOGLE ADS - Evento de conversión
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "lead_form_submission",
          form_name: "clorador_salino_lead",
          form_location: "instalacion-clorador-salino",
          value: 1800, // Valor estimado del lead
          currency: "EUR",
        });
      }

      // Tracking adicional de Google Analytics si está disponible
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "generate_lead", {
          event_category: "Lead",
          event_label: "Clorador Salino",
          value: 1800,
        });
      }

      setStatus("success");
      
      // Reset form
      setForm({
        nombre: "",
        telefono: "",
        poblacion: "",
        tiposPiscina: "",
        mensaje: "",
        fax: "",
      });
      setTouched(new Set());
      setErrors({});

    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  if (status === "success") {
    return (
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur-lg opacity-30" />
        <div className="relative bg-white/80 backdrop-blur-xl border border-emerald-200 rounded-2xl p-10 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/30">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.exito}</h3>
          <p className="text-slate-600">{t.exitoMsg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-3xl blur-xl" />
      <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl p-8 md:p-10 shadow-xl">
        {status === "error" && (
          <div className="bg-red-50 border border-red-200 p-4 mb-6 rounded-xl flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <span className="text-red-600 font-bold">!</span>
            </div>
            <div>
              <p className="text-red-800 font-semibold text-sm">{t.error}</p>
              <p className="text-red-600 text-xs">{t.errorMsg}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block font-medium text-slate-700 mb-2 text-sm">
              {t.nombre} <span className="text-cyan-600">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors text-sm bg-slate-50 ${
                errors.nombre && touched.has("nombre")
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 focus:border-cyan-500 focus:bg-white"
              }`}
              placeholder="Tu nombre"
            />
            {errors.nombre && touched.has("nombre") && (
              <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.nombre}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block font-medium text-slate-700 mb-2 text-sm">
              {t.telefono} <span className="text-cyan-600">*</span>
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors text-sm bg-slate-50 ${
                errors.telefono && touched.has("telefono")
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 focus:border-cyan-500 focus:bg-white"
              }`}
              placeholder="666 123 456"
            />
            {errors.telefono && touched.has("telefono") && (
              <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.telefono}</p>
            )}
          </div>

          {/* Población */}
          <div>
            <label htmlFor="poblacion" className="block font-medium text-slate-700 mb-2 text-sm">
              {t.poblacion} <span className="text-cyan-600">*</span>
            </label>
            <input
              type="text"
              id="poblacion"
              name="poblacion"
              value={form.poblacion}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors text-sm bg-slate-50 ${
                errors.poblacion && touched.has("poblacion")
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 focus:border-cyan-500 focus:bg-white"
              }`}
              placeholder="Sant Cugat, Terrassa, Barcelona..."
            />
            {errors.poblacion && touched.has("poblacion") && (
              <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.poblacion}</p>
            )}
          </div>

          {/* Tamaño piscina (opcional) */}
          <div>
            <label htmlFor="tiposPiscina" className="block font-medium text-slate-700 mb-2 text-sm">
              {t.tipoPiscina}
            </label>
            <select
              id="tiposPiscina"
              name="tiposPiscina"
              value={form.tiposPiscina}
              onChange={handleChange}
              className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-0 focus:border-cyan-500 focus:bg-white transition-colors text-sm bg-slate-50 appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
            >
              <option value="">Selecciona tamaño...</option>
              <option value="pequena">Pequeña (hasta 25m³)</option>
              <option value="mediana">Mediana (25-50m³)</option>
              <option value="grande">Grande (más de 50m³)</option>
              <option value="no-se">No lo sé</option>
            </select>
          </div>

          {/* Mensaje adicional (opcional) */}
          <div>
            <label htmlFor="mensaje" className="block font-medium text-slate-700 mb-2 text-sm">
              {t.mensaje}
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-0 focus:border-cyan-500 focus:bg-white transition-colors resize-none text-sm bg-slate-50"
              placeholder="¿Algún detalle sobre tu piscina?"
            />
          </div>

          {/* Honeypot (hidden) */}
          <input
            type="text"
            name="fax"
            value={form.fax}
            onChange={handleChange}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={sending || Object.keys(errors).length > 0}
            className="group w-full bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white font-semibold py-4 px-6 rounded-xl text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30"
          >
            {sending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t.enviando}
              </>
            ) : (
              <>
                {t.enviar}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </>
            )}
          </button>

          <p className="text-xs text-slate-500 text-center mt-4">
            Sin compromiso. Te llamamos en menos de 24h.
          </p>
        </form>
      </div>
    </div>
  );
}
