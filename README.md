# Fontanería Low Cost — Sitio Web (Next.js 15, TS, Tailwind, i18n, MongoDB)

Proyecto **desde cero** para la empresa real **Fontanería Low Cost** (Barcelona, España).
El sitio es **rápido**, **accesible**, **SEO-first**, **bilingüe (ES/EN)** y con **animaciones suaves**. 
Incluye **formulario de presupuesto** que guarda consultas en **MongoDB**.

## Objetivos
- Posicionamiento SEO sólido (metadatos por página, OpenGraph, Twitter Cards, sitemap, robots).
- UX/UI profesional: paleta clara, tipografía legible, componentes limpios, animaciones suaves.
- i18n real: rutas `/es/*` y `/en/*`, detección automática por navegador y selector manual.
- Backend mínimo: API `POST /api/quotes` para almacenar consultas en MongoDB (campos opcionales).
- Accesibilidad: semántica, `alt` descriptivo, focus visible, soporte `prefers-reduced-motion`.

# Fontanería Low Cost — Sitio Web (Next.js 15, TS, Tailwind, i18n, MongoDB)

Proyecto generado según la especificación: sitio profesional y elegante para "Fontanería Low Cost" (Barcelona).
Características principales:

- Bilingüe (es/en) con detección automática de idioma y rutas `/es/...`, `/en/...`.
- Formulario de presupuesto que guarda en MongoDB (colección `quotes`).
- SEO: metadata, JSON-LD LocalBusiness, sitemap.xml y `robots.txt`.
- Accesible: focus visible, textos alternativos en imágenes y soporte `prefers-reduced-motion`.

## Cómo usar (desarrollo)

1. Instala dependencias:

```bash
npm install
```

2. Añade variables de entorno en un archivo `.env.local`:

```bash
# URL pública del sitio (sin / final), usada para sitemap y metas
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cadena de conexión a MongoDB
MONGODB_URI=mongodb://localhost:27017/fontanerialowcost
```

3. Ejecuta en modo desarrollo:

```bash
npm run dev
```

4. Rutas principales (local):

- http://localhost:3000/es
- http://localhost:3000/en

## Estructura principal

- `app/[locale]/...` — páginas en `es` y `en` (home, servicios, contacto)
- `components/` — Header, Footer, ServiceCard, TestimonialCard, BudgetForm
- `app/api/quotes/route.ts` — endpoint para guardar presupuestos
- `lib/` — `db.ts` (MongoDB), `i18n.ts`, `seo.ts`
- `locales/` — `es.json`, `en.json` (copy inicial)
- `public/images/` — imágenes de ejemplo (placeholders)

## Variables de entorno requeridas

- `MONGODB_URI` — cadena de conexión a MongoDB
- `NEXT_PUBLIC_SITE_URL` — url pública del sitio (para sitemap/og)

## Imágenes
En `public/images/` hay archivos placeholder. Reemplaza `ImagenLogo.jpeg`, `HeroFondoLight.jpeg`, `ServicioFontaneria1.jpeg`, `ServicioPiscinas1.jpeg`, `ServicioElectricidad1.jpeg`, `Equipo1.jpeg`, `Testimonio1.jpeg` por imágenes reales respetando los nombres.

## Notas / siguientes pasos recomendados

- Añadir tests E2E para el API y el formulario.
- Revisar y completar textos legales y política de privacidad.
- Subir imágenes reales optimizadas.
- Configurar MLaaS / SMTP si se quiere recibir notificaciones por email.

---
Generado automáticamente: estructura inicial lista para desarrollo.
