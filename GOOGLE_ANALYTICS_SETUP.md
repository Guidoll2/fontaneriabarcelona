# 📊 Configuración de Google Analytics 4

## ✅ Implementación Completada

Se ha integrado Google Analytics 4 en el proyecto con las siguientes características:

### Archivos Creados/Modificados:
- ✅ `components/GoogleAnalytics.tsx` - Componente principal de GA4
- ✅ `app/layout.tsx` - Integración global
- ✅ `components/Header.tsx` - Tracking de llamadas
- ✅ `components/BudgetForm.tsx` - Tracking de formularios
- ✅ `app/[locale]/page.tsx` - Tracking en hero CTA
- ✅ `.env.local.example` - Template de variables de entorno

### Eventos Trackeados:
1. **Llamadas Telefónicas** (`phone_call`)
   - Header desktop: `header_desktop`
   - Header mobile: `header_mobile`
   - Hero CTA: `hero_cta`

2. **Envíos de Formulario** (`form_submission`)
   - Se trackea el tipo de servicio solicitado

3. **Vistas de Página** (automático)
   - Se trackean todas las navegaciones

---

## 🚀 Pasos para Activar

### 1. Crear Cuenta de Google Analytics 4

1. Ve a [Google Analytics](https://analytics.google.com)
2. Haz clic en **"Administrar"** (ícono de engranaje abajo a la izquierda)
3. Haz clic en **"Crear cuenta"**
4. Completa los datos:
   - Nombre de cuenta: `Mi Agencia Web` (o tu nombre)
   - Nombre de propiedad: `Fontanería Terrassa`
   - Zona horaria: `España (GMT+1)`
   - Moneda: `EUR`
5. Selecciona la categoría del negocio: **"Servicios profesionales"**
6. Haz clic en **"Crear"** y acepta los términos

### 2. Obtener tu ID de Medición

Después de crear la propiedad:

1. En **"Administrar"** → **"Flujos de datos"**
2. Haz clic en **"Agregar flujo"** → **"Web"**
3. Completa:
   - URL del sitio web: `https://fontanerialowcost.com` (tu dominio)
   - Nombre del flujo: `Sitio Web Principal`
4. Haz clic en **"Crear flujo"**
5. **Copia el ID de medición** (formato: `G-XXXXXXXXXX`)

### 3. Configurar el Proyecto

1. Crea el archivo `.env.local` en la raíz del proyecto:
```bash
# En Windows (CMD)
copy .env.local.example .env.local

# En PowerShell
Copy-Item .env.local.example .env.local
```

2. Edita `.env.local` y pega tu ID:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

3. Reinicia el servidor de desarrollo:
```bash
npm run dev
```

### 4. Verificar que Funciona

1. Abre tu sitio en el navegador
2. En Google Analytics, ve a **"Informes"** → **"Tiempo real"**
3. Deberías ver tu visita activa en los próximos 30 segundos
4. Prueba hacer clic en "Llamar Ahora" o enviar el formulario
5. En GA4, ve a **"Informes" → "Tiempo real" → "Eventos"** para ver los eventos

---

## 📈 Configurar Google Search Console

Para SEO completo, también necesitas Search Console:

### 1. Crear Propiedad en Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Haz clic en **"Agregar propiedad"**
3. Selecciona **"Prefijo de URL"**
4. Ingresa: `https://fontanerialowcost.com`

### 2. Verificar el Dominio

Opción más fácil - Verificación HTML:

1. Search Console te dará un código como: `google1234567890abcdef.html`
2. Agrégalo a `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_VERIFICATION=google1234567890abcdef
```
3. Ya está configurado en el proyecto (revisa `app/layout.tsx`)
4. Vuelve a Search Console y haz clic en **"Verificar"**

### 3. Conectar GA4 con Search Console

1. En Google Analytics → **"Administrar"**
2. **"Vínculos de Search Console"**
3. Haz clic en **"Vincular"**
4. Selecciona tu propiedad de Search Console
5. Confirma

---

## 📊 Dashboards y Reportes Útiles

### Métricas Clave a Monitorear:

1. **Conversiones (Leads)**
   - Formularios enviados
   - Llamadas realizadas

2. **Tráfico**
   - Usuarios nuevos vs recurrentes
   - Fuentes de tráfico (orgánico, directo, referido)
   - Páginas más visitadas

3. **Comportamiento**
   - Tasa de rebote
   - Tiempo en el sitio
   - Páginas por sesión

4. **Geografía**
   - Terrassa, Sabadell, Barcelona
   - Qué zonas generan más leads

### Crear un Informe Personalizado:

1. En GA4, ve a **"Explorar"** → **"Crear nueva exploración"**
2. Agrega métricas relevantes:
   - Usuarios
   - Sesiones
   - Eventos (`phone_call`, `form_submission`)
3. Agrega dimensiones:
   - Ciudad
   - Fuente/medio
   - Página de destino

---

## 💰 Modelo de Servicio para el Cliente

### Setup Inicial (Una vez)
**Precio sugerido: 150-300€**

Incluye:
- Configuración de Google Analytics 4
- Configuración de Google Search Console
- Vinculación de ambas herramientas
- Instalación de código de tracking
- Configuración de eventos personalizados
- Verificación de funcionamiento

### Mantenimiento Mensual
**Precio sugerido: 50-100€/mes**

Incluye:
- Reporte mensual en PDF/presentación
- Análisis de métricas clave
- Recomendaciones de optimización SEO
- Ajustes de contenido basados en datos
- Revisión de palabras clave
- Comparativa mes a mes

### Servicios Opcionales (Adicionales)
- **Google Ads**: Gestión + presupuesto
- **SEO avanzado**: 200-500€/mes
- **Contenido optimizado**: Blogs, artículos
- **Análisis competitivo**: 150€ una vez

---

## 🎯 Beneficios para el Cliente

Con Analytics configurado, podrás decirle al cliente:

✅ **"Puedes ver en tiempo real cuántas personas visitan tu web"**
✅ **"Sabrás qué servicio es más buscado (fontanería vs piscinas)"**
✅ **"Verás de qué ciudades vienen más clientes potenciales"**
✅ **"Medirás el ROI si haces publicidad en Google o Facebook"**
✅ **"Te haré reportes mensuales con recomendaciones concretas"**

---

## 🔧 Solución de Problemas

### No aparecen datos en GA4
- Verifica que `.env.local` tiene el ID correcto
- Reinicia el servidor de desarrollo
- Abre las DevTools → Console, busca errores de gtag
- Revisa que el ID empiece con `G-` (no `UA-`)

### Los eventos no se registran
- Abre DevTools → Network → busca requests a `google-analytics.com`
- Verifica que los onClick se ejecutan (agrega `console.log`)
- En GA4, espera 5-10 minutos, no es 100% tiempo real

### Search Console no verifica
- Verifica que desplegaste los cambios en producción
- El archivo de verificación debe estar en `<head>`
- Prueba con el método de Meta Tag en lugar de archivo

---

## 📚 Recursos Adicionales

- [Documentación oficial GA4](https://support.google.com/analytics/answer/9304153)
- [Guía de eventos GA4](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Next.js + Google Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

---

## ✅ Checklist Final

- [ ] Crear cuenta de Google Analytics
- [ ] Obtener ID de medición (G-XXXXXXXXXX)
- [ ] Crear archivo `.env.local` con el ID
- [ ] Reiniciar servidor de desarrollo
- [ ] Verificar en tiempo real que funciona
- [ ] Configurar Google Search Console
- [ ] Vincular GA4 con Search Console
- [ ] Probar eventos (llamadas y formulario)
- [ ] Crear dashboard personalizado
- [ ] Preparar primer reporte para el cliente

---

¡Listo! Ahora tienes un sistema completo de analytics y SEO para ofrecer a tus clientes. 🚀
