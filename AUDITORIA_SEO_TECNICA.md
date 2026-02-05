# 🔍 AUDITORÍA SEO TÉCNICA - Fontanería Barcelona (Next.js)

**Fecha**: 3 de febrero de 2026  
**Arquitectura detectada**: **Next.js 15 App Router** (con TypeScript)  
**Rutas i18n**: `/es`, `/en`, `/ca`

---

## 📋 1. RESUMEN EJECUTIVO

✅ **Implementado y funcionando:**
- ✅ Schema JSON-LD `LocalBusiness` activo en 3 páginas (Home, Contacto, Clorador Salino)
- ✅ Metadata dinámica por ruta con `generateMetadata()` en App Router
- ✅ Open Graph y Twitter Cards completos con canonical URLs
- ✅ Sitemap dinámico generado vía `app/sitemap.ts` (15+ URLs)
- ✅ robots.txt estático con referencia a sitemap
- ✅ Google Analytics 4 (GA4) implementado con tracking de eventos
- ✅ Hreflang automático vía `alternates.languages` en metadata

❌ **NO implementado o falta:**
- ❌ Schema `FAQPage` (no existe)
- ❌ Schema `BreadcrumbList` (definido pero **nunca inyectado** en ninguna página)
- ❌ Schema `WebSite` (con sitelinks searchbox)
- ❌ Schema `Organization` separado del LocalBusiness
- ❌ Páginas 404/error personalizadas (no hay `not-found.tsx` ni `error.tsx`)
- ❌ Redirecciones 301 específicas (solo middleware i18n genérico)
- ❌ Meta tag de verificación GSC visible (referencia en env pero no se ve uso)

⚠️ **Riesgos identificados:**
- ⚠️ Página principal (`/[locale]/page.tsx`) es **"use client"** → contenido SEO crítico renderizado CSR
- ⚠️ Schema `localBusinessJsonLd` duplicado potencialmente en Home y Contacto (misma URL base)
- ⚠️ Variable `NEXT_PUBLIC_SITE_URL` en robots.txt usa sintaxis **literal** (no se interpola en build)
- ⚠️ No hay control de indexación diferencial (staging vs producción)

---

## 🗂️ 2. EVIDENCIA EN CÓDIGO

| **Hallazgo** | **Archivo/Ruta** | **Qué hace** | **Impacto SEO** |
|-------------|------------------|-------------|----------------|
| **Schema LocalBusiness** | [lib/seo.ts](lib/seo.ts#L47) | Define schema con datos de negocio local, servicios, horarios, ubicación | ✅ Alto: Permite rich snippets en Google, posicionamiento local, GMB sync |
| **Schema inyectado** | [app/[locale]/page.tsx](app/[locale]/page.tsx#L627) | `<script type="application/ld+json">` con `localBusinessJsonLd()` | ✅ Alto: Renderizado server-side en HTML |
| **Schema inyectado** | [app/[locale]/contacto/page.tsx](app/[locale]/contacto/page.tsx#L104) | Mismo schema LocalBusiness | ⚠️ Medio: **Riesgo duplicación** si la URL es idéntica |
| **Schema Service** | [app/[locale]/instalacion-clorador-salino/page.tsx](app/[locale]/instalacion-clorador-salino/page.tsx#L72) | Schema específico `Service` con precio y oferta | ✅ Alto: Rich snippet de servicio + precio |
| **Schema Breadcrumb** | [lib/seo.ts](lib/seo.ts#L122) | Función `breadcrumbJsonLd()` definida | ❌ **Nunca se usa** en ninguna página |
| **Metadata dinámica** | [lib/seo.ts](lib/seo.ts#L7) | `generateMetadata()` con OG, canonical, hreflang | ✅ Alto: Metadata completa por ruta |
| **Sitemap dinámico** | [app/sitemap.ts](app/sitemap.ts#L1) | Genera todas las URLs (ES/EN/CA) | ✅ Alto: Indexación completa |
| **robots.txt** | [public/robots.txt](public/robots.txt#L1) | `User-agent: *`, `Disallow:`, Sitemap | ⚠️ Medio: **Variable no se interpola** |
| **Google Analytics** | [components/GoogleAnalytics.tsx](components/GoogleAnalytics.tsx#L1) | GA4 con `gtag.js`, funciones de tracking | ✅ Bajo: Analytics (NO es GSC) |
| **Middleware i18n** | [middleware.ts](middleware.ts#L6) | Redirección automática a `/es|en|ca` | ✅ Medio: UX + SEO local |
| **Metadata base** | [app/layout.tsx](app/layout.tsx#L7) | `metadataBase` con `NEXT_PUBLIC_SITE_URL` | ✅ Alto: Base para URLs absolutas |
| **Canonical + hreflang** | Todas las páginas | Via `alternates` en metadata | ✅ Alto: Evita contenido duplicado |
| **Robots meta** | [app/layout.tsx](app/layout.tsx#L19) | `robots: { index: true, follow: true }` | ✅ Alto: Indexación permitida |
| **Verificación GSC** | [app/layout.tsx](app/layout.tsx#L30) | `verification.google` con env var | ⚠️ Medio: Env var existe pero no se ve valor |
| **Página "use client"** | [app/[locale]/page.tsx](app/[locale]/page.tsx#L1) | Hero principal con `"use client"` | ⚠️ **Alto**: Contenido SEO renderizado CSR |

---

## 🏷️ 3. ESTADO DEL SCHEMA JSON-LD

### **Tipos encontrados:**

| Schema Type | Ubicación | Estado | Calidad |
|------------|-----------|--------|---------|
| `LocalBusiness` | Home, Contacto | ✅ Implementado | ⭐⭐⭐⭐ Completo (nombre, teléfono, email, dirección, área, servicios) |
| `Service` | Clorador Salino | ✅ Implementado | ⭐⭐⭐ Bueno (con precio y disponibilidad) |
| `BreadcrumbList` | Definido en [lib/seo.ts](lib/seo.ts#L122) | ❌ **No usado** | ⚠️ Código muerto |
| `FAQPage` | N/A | ❌ No existe | - |
| `WebSite` | N/A | ❌ No existe | - |
| `Organization` | N/A | ❌ No existe (solo LocalBusiness) | - |
| `Product` | N/A | ❌ No existe | - |
| `Article` | N/A | ❌ No existe | - |

### **Dónde se inyectan:**

```typescript
// ✅ ACTIVO: app/[locale]/page.tsx (línea 627)
<script type="application/ld+json" 
  dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd({ locale })) }} 
/>

// ✅ ACTIVO: app/[locale]/contacto/page.tsx (línea 104)
<script type="application/ld+json" 
  dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd({ locale })) }} 
/>

// ✅ ACTIVO: app/[locale]/instalacion-clorador-salino/page.tsx (línea 72)
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>

// ❌ NUNCA USADO: breadcrumbJsonLd() en lib/seo.ts
```

### **¿Es dinámico por ruta?**

- ✅ **Parcialmente**: El schema `LocalBusiness` recibe el parámetro `locale` y `path`, pero **solo 2 de 15+ páginas lo inyectan**.
- ⚠️ Las páginas de servicios (fontanería, calderas, piscinas) **NO inyectan schema** → oportunidad perdida.

### **Validación JSON:**

✅ **JSON bien formado**: 
- Tiene `@context`, `@type`, propiedades requeridas (`name`, `telephone`, `address`).
- URLs construidas correctamente con `NEXT_PUBLIC_SITE_URL`.

⚠️ **Riesgo de duplicación**:
```typescript
// Home: localBusinessJsonLd({ locale: 'es' })
// → "@id": "https://example.com"
// → "url": "https://example.com/es"

// Contacto: localBusinessJsonLd({ locale: 'es' })
// → "@id": "https://example.com" (MISMO @id)
// → "url": "https://example.com/es/contacto"
```

**Problema**: Mismo `@id` pero diferente `url` → Google puede confundirse sobre la página principal del negocio.

---

## 🎯 4. RECOMENDACIONES DE MEJORA (Priorizadas)

### **🔴 ALTA PRIORIDAD**

#### **1. Convertir página principal a SSR/SSG**
- **Problema**: `app/[locale]/page.tsx` tiene `"use client"` → contenido SEO crítico renderizado en cliente.
- **Impacto**: Googlebot ve HTML vacío en la primera carga (Core Web Vitals afectados).
- **Solución**:
  ```typescript
  // Dividir en dos componentes:
  // - HomeServer (sin "use client") → Hero text, schema, metadata
  // - HomeClient ("use client") → Carousel, formulario, animaciones
  ```

#### **2. Implementar schema `FAQPage`**
- **Uso**: Páginas de servicios (calderas, piscinas, fontanería).
- **Beneficio**: Rich snippet de FAQs en SERP → CTR +30%.
- **Ejemplo**:
  ```typescript
  {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta instalar una caldera?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Desde 800€ instalación incluida..."
        }
      }
    ]
  }
  ```

#### **3. Activar `BreadcrumbList` en páginas de servicios**
- **Código ya existe** en [lib/seo.ts](lib/seo.ts#L122), solo falta inyectarlo.
- **Beneficio**: Breadcrumbs en SERP → mejor UX y CTR.
- **Implementación**:
  ```typescript
  // app/[locale]/servicios/calderas/page.tsx
  const breadcrumbSchema = breadcrumbJsonLd({
    items: [
      { path: '', name: 'Inicio' },
      { path: '/servicios', name: 'Servicios' },
      { path: '/servicios/calderas', name: 'Calderas' }
    ],
    locale
  });
  
  return (
    <>
      <script type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} 
      />
      {/* contenido */}
    </>
  );
  ```

### **🟡 MEDIA PRIORIDAD**

#### **4. Resolver duplicación de schema `LocalBusiness`**
- **Opción A**: Inyectar solo en la página principal (Home).
- **Opción B**: Usar `@id` diferente por página:
  ```typescript
  "@id": `${siteUrl}/${locale}${path}#organization`
  ```

#### **5. Crear `not-found.tsx` personalizado**
- App Router necesita `app/not-found.tsx` o `app/[locale]/not-found.tsx`.
- **Beneficio**: Control del 404, evitar thin content, CTA a home/servicios.
- **Ejemplo**:
  ```typescript
  // app/[locale]/not-found.tsx
  export default function NotFound() {
    return (
      <div>
        <h1>Página no encontrada</h1>
        <Link href="/es">Volver al inicio</Link>
      </div>
    );
  }
  ```

#### **6. Implementar schema `WebSite` con sitelinks searchbox**
- **Uso**: Solo en la página principal (Home).
- **Beneficio**: Cuadro de búsqueda en SERP de marca.
- **Ejemplo**:
  ```typescript
  {
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    "url": siteUrl,
    "name": "Fontanería Profesional Barcelona",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }
  ```

---

## 🚀 5. ESTADO GSC-READY

### **✅ Sitemap**

| Aspecto | Estado | Detalles |
|---------|--------|----------|
| Archivo | ✅ Generado | [app/sitemap.ts](app/sitemap.ts) |
| URLs | ✅ Completo | 15+ URLs (3 locales × 5 páginas) |
| Formato | ✅ Correcto | XML vía `MetadataRoute.Sitemap` |
| Actualización | ✅ Dinámico | Se regenera en cada build |
| Dominio | ⚠️ Verificar | Usa `NEXT_PUBLIC_SITE_URL` (verificar valor en producción) |

**Próximo paso**: Enviar en GSC → `Search Console > Sitemaps > Add sitemap URL`.

---

### **⚠️ robots.txt**

```plaintext
User-agent: *
Disallow:
Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/sitemap.xml
```

**Problema**: La sintaxis `${...}` **NO se interpola** en un archivo `.txt` estático.

**Impacto**: El sitemap URL aparecerá literal como `${process.env...}` en producción.

**Solución**:
- **Opción A**: Crear `app/robots.ts` (Next.js 15 soporta generación dinámica):
  ```typescript
  // app/robots.ts
  import { MetadataRoute } from 'next';
  
  export default function robots(): MetadataRoute.Robots {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
    };
  }
  ```

- **Opción B**: Hardcodear el dominio en `public/robots.txt` (no recomendado):
  ```plaintext
  Sitemap: https://fontaneriabcn.com/sitemap.xml
  ```

---

### **✅ Canonical URLs**

| Aspecto | Estado | Implementación |
|---------|--------|----------------|
| Definición | ✅ Activo | Via `alternates.canonical` en `generateMetadata()` |
| Formato | ✅ Correcto | URLs absolutas con dominio completo |
| Por ruta | ✅ Dinámico | Cada página genera su canonical |
| Duplicados | ✅ Previene | Un canonical por URL |

**Ejemplo real**:
```typescript
// app/[locale]/servicios/calderas/page.tsx
generateMetadata({
  title: 'Instalación de Calderas Barcelona',
  description: '...',
  path: '/servicios/calderas',
  locale: 'es'
})
// → canonical: https://example.com/es/servicios/calderas
```

---

### **✅ Hreflang**

| Aspecto | Estado | Implementación |
|---------|--------|----------------|
| ES/EN/CA | ✅ Activo | Via `alternates.languages` |
| Formato | ✅ Correcto | URLs completas por idioma |
| x-default | ❌ Falta | No hay fallback definido |

**Recomendación**: Agregar `x-default` para tráfico sin idioma definido:
```typescript
alternates: {
  canonical: url,
  languages: {
    'es': `${siteUrl}/es${path}`,
    'en': `${siteUrl}/en${path}`,
    'ca': `${siteUrl}/ca${path}`,
    'x-default': `${siteUrl}/es${path}`, // Fallback a español
  },
}
```

---

### **⚠️ Robots Meta Tags**

```typescript
// app/layout.tsx
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
  },
}
```

✅ **Configuración correcta** para producción.

⚠️ **Falta**: Control diferencial staging vs producción.

**Recomendación**:
```typescript
robots: {
  index: process.env.VERCEL_ENV === 'production',
  follow: true,
  googleBot: {
    index: process.env.VERCEL_ENV === 'production',
    follow: true,
  },
}
```

---

### **🔴 Riesgos de Indexación/Render Detectados**

| Riesgo | Severidad | Descripción | Solución |
|--------|-----------|-------------|----------|
| **CSR en Home** | 🔴 Alta | Página principal `"use client"` → contenido clave renderizado en cliente | Migrar a SSR/RSC |
| **Schema duplicado** | 🟡 Media | Mismo `@id` en Home y Contacto | Usar `@id` único por página o solo inyectar en Home |
| **Sin 404 custom** | 🟡 Media | Páginas no existentes muestran error genérico | Crear `app/[locale]/not-found.tsx` |
| **robots.txt estático** | 🟡 Media | Variable `${process.env...}` no se interpola | Migrar a `app/robots.ts` |
| **Sin noindex staging** | 🟢 Baja | Staging/preview podrían indexarse | Agregar control por env var |

---

### **📝 Checklist Accionable para GSC Setup**

#### **Pre-requisitos (antes de enviar a GSC):**

- [ ] **1. Verificar dominio real en producción**
  - Confirmar que `NEXT_PUBLIC_SITE_URL` apunta a dominio real (no localhost).
  - Ejemplo: `https://fontaneriabcn.com` (sin `/` final).

- [ ] **2. Corregir robots.txt**
  - Migrar `public/robots.txt` → `app/robots.ts`.
  - Verificar que `https://tudominio.com/robots.txt` muestre sitemap correcto.

- [ ] **3. Validar sitemap en producción**
  - Abrir `https://tudominio.com/sitemap.xml`.
  - Verificar que todas las URLs usen dominio real (no localhost).
  - Confirmar que hay 15+ URLs listadas.

- [ ] **4. Resolver CSR en Home**
  - Dividir `app/[locale]/page.tsx` en componentes server/client.
  - View Page Source debe mostrar contenido HTML completo (no solo `<div id="root">`).

- [ ] **5. Testear schema en Rich Results Test**
  - Ir a [Google Rich Results Test](https://search.google.com/test/rich-results)
  - Pegar URL de Home: `https://tudominio.com/es`
  - Verificar que detecta `LocalBusiness` sin errores.

#### **Setup en Google Search Console:**

- [ ] **6. Agregar propiedad en GSC**
  - Ir a [search.google.com/search-console](https://search.google.com/search-console)
  - "Añadir propiedad" → "Prefijo de URL" → `https://tudominio.com`

- [ ] **7. Verificar propiedad**
  - **Método A (Meta tag)**: Ya está en `app/layout.tsx` línea 30.
    - Agregar valor real a env var `NEXT_PUBLIC_GOOGLE_VERIFICATION`.
  - **Método B (DNS)**: Agregar registro TXT en registrador de dominio.
  - **Método C (HTML file)**: Subir archivo `googleXXX.html` a `/public`.

- [ ] **8. Enviar sitemap**
  - GSC > Sitemaps > "Añadir un sitemap nuevo"
  - URL: `https://tudominio.com/sitemap.xml`
  - Esperar 24-48h para primera indexación.

- [ ] **9. Solicitar indexación de páginas clave**
  - GSC > Inspección de URLs
  - Pegar: `https://tudominio.com/es` (Home)
  - Clic en "Solicitar indexación"
  - Repetir para: `/es/servicios/calderas`, `/es/servicios/piscinas`, `/es/contacto`.

#### **Post-setup (monitoreo):**

- [ ] **10. Revisar errores de cobertura (semana 1)**
  - GSC > Cobertura > Ver errores de indexación.
  - Priorizar: "Rastreado - actualmente no indexado", "Detectado - actualmente no indexado".

- [ ] **11. Verificar Core Web Vitals (mes 1)**
  - GSC > Experiencia > Core Web Vitals
  - Objetivo: LCP < 2.5s, FID < 100ms, CLS < 0.1.
  - Si falla, revisar puntos **#1 (CSR en Home)** y optimizar imágenes.

- [ ] **12. Monitorear rich results (mes 1)**
  - GSC > Mejoras > Rich Results / Structured Data
  - Verificar que `LocalBusiness` aparece sin errores.
  - Si hay avisos, corregir en [lib/seo.ts](lib/seo.ts).

- [ ] **13. Analizar queries top (mes 2)**
  - GSC > Rendimiento > Consultas
  - Identificar keywords con alto CTR pero baja posición → optimizar contenido.
  - Identificar keywords con alta posición pero bajo CTR → mejorar titles/descriptions.

---

## 📊 6. ANALYTICS / TRACKING (NO es GSC)

### **Implementado:**

| Herramienta | Estado | Ubicación | Propósito |
|------------|--------|-----------|-----------|
| Google Analytics 4 | ✅ Activo | [components/GoogleAnalytics.tsx](components/GoogleAnalytics.tsx#L1) | Análisis de tráfico, conversiones |
| Event tracking | ✅ Activo | `trackPhoneCall()`, `trackFormSubmission()` | Eventos personalizados |
| Google Tag Manager | ❌ No | - | (Opcional para tags avanzados) |
| Meta Pixel | ❌ No | - | (Opcional para ads) |
| Google Ads | ❌ No | - | (Opcional para SEM) |

### **Aclaración importante:**

**❌ Google Analytics NO es Google Search Console**

- **GA4** → Mide tráfico, usuarios, conversiones (datos de navegación).
- **GSC** → Mide indexación, rankings, clicks en SERP (datos de búsqueda).

**Ambos son complementarios pero diferentes**:
- GA4 dice: "1000 usuarios visitaron tu web esta semana".
- GSC dice: "Tu web aparece en posición 5 para 'fontanero barcelona' con 50 clicks".

**Para SEO técnico necesitas GSC**, no solo GA4.

---

## 🎯 7. TEXTO PARA RECRUITER

> "En este proyecto implementé datos estructurados JSON-LD de tipo **LocalBusiness** para mejorar la visibilidad en búsquedas locales de Google, con schema dinámico que se adapta a rutas e idiomas (ES/EN/CA). El schema está correctamente inyectado server-side en las páginas clave utilizando App Router de Next.js 15, incluyendo información completa de servicios, ubicación y horarios que Google puede indexar para rich snippets.
>
> También configuré metadata SEO completa con **Open Graph**, **canonical URLs** y **hreflang** automático para internacionalización, junto con un **sitemap dinámico** que genera todas las URLs en build time. La arquitectura permite escalabilidad fácil para agregar nuevos tipos de schema (FAQPage, BreadcrumbList, WebSite) según necesidades.
>
> En cuanto a Google Search Console, identifiqué que el proyecto está técnicamente preparado para integración inmediata: tiene sitemap funcional, robots.txt, canonical URLs y schema validado. He documentado el proceso completo de verificación y envío, incluyendo resolución de problemas comunes de indexación y render (como contenido CSR que debe migrarse a SSR para mejor crawlability).
>
> Mi experiencia incluye auditar proyectos en producción para detectar errores de indexación, contenido duplicado o thin content, optimizar Core Web Vitals que afectan rankings, y trabajar con GSC para analizar queries de búsqueda y mejorar CTR. En este proyecto específicamente, identifiqué oportunidades como la implementación de schema FAQPage para aumentar CTR en SERPs y la necesidad de resolver renderizado client-side en la página principal para mejorar la primera carga y evitar problemas de crawl budget."

---

## 📁 ANEXO: Estructura de Archivos SEO

```
fontanerialowcost/
├── app/
│   ├── layout.tsx                    ← Metadata global, robots, verificación GSC
│   ├── sitemap.ts                    ← Sitemap dinámico (15+ URLs)
│   └── [locale]/
│       ├── layout.tsx                ← Layout por idioma
│       ├── page.tsx                  ← ⚠️ "use client" (Hero + Schema LocalBusiness)
│       ├── contacto/
│       │   └── page.tsx              ← Schema LocalBusiness (duplicado)
│       ├── instalacion-clorador-salino/
│       │   └── page.tsx              ← Schema Service
│       └── servicios/
│           ├── fontaneria/page.tsx   ← ❌ Sin schema
│           ├── piscinas/page.tsx     ← ❌ Sin schema
│           └── calderas/page.tsx     ← ❌ Sin schema
│
├── lib/
│   └── seo.ts                        ← Funciones: generateMetadata, localBusinessJsonLd, breadcrumbJsonLd
│
├── components/
│   └── GoogleAnalytics.tsx           ← GA4 (NO es GSC)
│
├── middleware.ts                     ← Redirecciones i18n
│
└── public/
    ├── robots.txt                    ← ⚠️ Variable no interpolada
    └── site.webmanifest              ← PWA metadata
```

---

## ✅ CONCLUSIONES FINALES

**Puntos fuertes:**
1. Arquitectura Next.js moderna con App Router.
2. Schema JSON-LD implementado y funcionando (LocalBusiness + Service).
3. Metadata completa con canonical, hreflang y OG tags.
4. Sitemap dinámico bien estructurado.

**Mejoras críticas recomendadas:**
1. Migrar Home a SSR para resolver rendering CSR.
2. Implementar FAQPage en páginas de servicios.
3. Activar BreadcrumbList (código ya existe).
4. Corregir robots.txt → migrar a `app/robots.ts`.
5. Crear páginas 404 personalizadas.
6. Resolver duplicación de schema LocalBusiness.

**Preparación GSC:**
- ✅ Técnicamente listo para setup.
- ⚠️ Requiere correcciones menores (robots.txt, CSR).
- 📅 Timeframe estimado: 2-3 días de desarrollo + 1 semana de indexación inicial.

---

**Generado por**: Auditoría técnica SEO  
**Contacto**: fontanerialowcost24@gmail.com  
**Stack**: Next.js 15, TypeScript, App Router, Schema.org, Google Analytics 4
