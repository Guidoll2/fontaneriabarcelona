"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Form = {
  nombre?: string;
  email?: string;
  telefono?: string;
  servicio?: string;
  zona?: string;
  mensaje?: string;
  fax?: string;
};

type FieldError = {
  email?: string;
  telefono?: string;
};

export default function BudgetForm({ locale = "es" }: { locale?: string }) {
  const [form, setForm] = useState<Form>({});
  const [status, setStatus] = useState<{ type: "success" | "error", message: string } | null>(null);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<FieldError>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  // Helper function for translations
  const t = (es: string, en: string, ca: string) => {
    if (locale === "en") return en;
    if (locale === "ca") return ca;
    return es;
  };

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone: string) {
    return /^[0-9+\s()-]{9,}$/.test(phone);
  }

  function validateField(name: string, value: string) {
    const newErrors = { ...errors };
    
    switch (name) {
      case "email":
        if (value && !validateEmail(value)) {
          newErrors.email = t("Email inválido", "Please enter a valid email", "Email invàlid");
        } else {
          delete newErrors.email;
        }
        break;
      case "telefono":
        if (value && !validatePhone(value)) {
          newErrors.telefono = t("Teléfono inválido", "Please enter a valid phone", "Telèfon invàlid");
        } else {
          delete newErrors.telefono;
        }
        break;
    }

    setErrors(newErrors);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setTouched(new Set(touched).add(e.target.name));
    validateField(e.target.name, e.target.value);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (Object.keys(errors).length > 0) {
      setStatus({ type: "error", message: t("Corrige los errores", "Please correct errors", "Corregeix els errors") });
      return;
    }

    if (form.fax) {
      setStatus({ type: "error", message: "Spam detected" });
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      
      if (res.ok) {
        setStatus({ 
          type: "success", 
          message: t("Mensaje enviado!", "Message sent!", "Missatge enviat!")
        });
        setForm({});
        setTouched(new Set());
      } else {
        const data = await res.json();
        setStatus({ type: "error", message: data?.error || "Error" });
      }
    } catch (err) {
      setStatus({ type: "error", message: t("Error de red", "Network error", "Error de xarxa") });
    } finally {
      setSending(false);
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.5 }} 
      className="card p-8 lg:p-10 bg-white shadow-lg border border-secondary-200"
    >
      {/* Form Title */}
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-secondary-900 mb-2">
          {t("Solicita un Presupuesto Gratis", "Request a Free Quote", "Sol·licita un Pressupost Gratis")}
        </h3>
        <p className="text-secondary-600">
          {t("Rellena el formulario y nos pondremos en contacto contigo lo antes posible", 
             "Fill out the form and we'll contact you as soon as possible",
             "Omple el formulari i ens posarem en contacte amb tu el més aviat possible")}
        </p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        <input type="text" name="fax" value={form.fax || ""} onChange={update} className="hidden" aria-hidden tabIndex={-1} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="nombre" className="label-base">{t("Nombre", "Name", "Nom")}</label>
            <input id="nombre" name="nombre" type="text" value={form.nombre || ""} onChange={update} onBlur={handleBlur} className="input-base" placeholder={t("Tu nombre", "Your name", "El teu nom")} />
          </div>

          <div className="space-y-2">
            <label htmlFor="telefono" className="label-base">{t("Teléfono", "Phone", "Telèfon")}</label>
            <input id="telefono" name="telefono" type="tel" value={form.telefono || ""} onChange={update} onBlur={handleBlur} className={`input-base ${touched.has("telefono") && errors.telefono ? "input-error" : ""}`} placeholder="+34 677 133 242" />
            {touched.has("telefono") && errors.telefono && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-red-600">{errors.telefono}</motion.p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="email" className="label-base">Email</label>
            <input id="email" name="email" type="email" value={form.email || ""} onChange={update} onBlur={handleBlur} className={`input-base ${touched.has("email") && errors.email ? "input-error" : ""}`} placeholder="tu@email.com" />
            {touched.has("email") && errors.email && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-red-600">{errors.email}</motion.p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="servicio" className="label-base">{t("Servicio", "Service", "Servei")}</label>
            <select id="servicio" name="servicio" value={form.servicio || ""} onChange={update} className="input-base">
              <option value="">{t("Seleccionar servicio", "Select service", "Seleccionar servei")}</option>
              <option value="fontaneria">{t("Fontanería", "Plumbing", "Fontaneria")}</option>
              <option value="piscinas">{t("Piscinas", "Pools", "Piscines")}</option>
              <option value="electricidad">{t("Electricidad", "Electrical", "Electricitat")}</option>
              <option value="urgencia">{t("Urgencia", "Emergency", "Urgència")}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="zona" className="label-base">{t("Ubicación", "Location", "Ubicació")}</label>
            <input id="zona" name="zona" type="text" value={form.zona || ""} onChange={update} className="input-base" placeholder="Barcelona, Badalona..." />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="mensaje" className="label-base">{t("Mensaje", "Message", "Missatge")}</label>
            <textarea id="mensaje" name="mensaje" value={form.mensaje || ""} onChange={update} rows={4} className="input-base resize-none" placeholder={t("Cuéntanos tu necesidad...", "Tell us about your needs...", "Explica'ns la teva necessitat...")} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-secondary-100">
          <motion.button disabled={sending || Object.keys(errors).length > 0} type="submit" className="btn-primary w-full sm:flex-1" whileHover={!sending ? { scale: 1.02 } : {}} whileTap={!sending ? { scale: 0.98 } : {}}>
            {sending ? t("Enviando...", "Sending...", "Enviant...") : t("Enviar Solicitud", "Send Request", "Enviar Sol·licitud")}
          </motion.button>
          <motion.a href="tel:+34677133242" className="btn-secondary w-full sm:w-auto text-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {t("Llamar Ahora", "Call Now", "Trucar Ara")}
          </motion.a>
        </div>

        <AnimatePresence mode="wait">
          {status && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`p-4 rounded-lg ${status.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
              {status.message}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
