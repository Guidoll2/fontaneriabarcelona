# Configuración de Google Places API - Guía Paso a Paso

## 📌 ¿Para qué necesitamos esto?
Para mostrar automáticamente las reseñas reales de Google Maps en tu sitio web.

---

## ✅ Paso 1: Crear Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Inicia sesión con tu cuenta de Google (la que usas para tu negocio)
3. Click en el menú desplegable de proyectos (arriba a la izquierda)
4. Click en **"Nuevo Proyecto"**
5. Nombre del proyecto: `Fontaneria Low Cost Web`
6. Click en **"Crear"**
7. Espera unos segundos a que se cree el proyecto

---

## ✅ Paso 2: Habilitar Places API

1. Con tu proyecto seleccionado, ve al menú ☰ (hamburguesa arriba izquierda)
2. Ve a **"APIs y servicios"** → **"Biblioteca"**
3. En el buscador escribe: `Places API`
4. Click en **"Places API (New)"** o **"Places API"**
5. Click en el botón azul **"HABILITAR"**
6. Espera a que se habilite (10-20 segundos)

---

## ✅ Paso 3: Crear API Key

1. Ve al menú ☰ → **"APIs y servicios"** → **"Credenciales"**
2. Click en **"+ CREAR CREDENCIALES"** (arriba)
3. Selecciona **"Clave de API"**
4. Se creará una API Key - **¡CÓPIALA!** (se verá algo como: `AIzaSyC...`)
5. **IMPORTANTE**: Click en **"RESTRINGIR CLAVE"** (por seguridad)

---

## ✅ Paso 4: Restringir la API Key (IMPORTANTE - Seguridad)

### 4.1 Restricción de aplicación:
1. En "Restricciones de la aplicación" selecciona: **"Referentes HTTP (sitios web)"**
2. Click en **"Agregar elemento"**
3. Agrega estos dominios (uno por línea):
   ```
   *.fontanerialowcost.com/*
   localhost:3000/*
   *.vercel.app/*
   ```
4. Click en **"Listo"**

### 4.2 Restricción de API:
1. En "Restricciones de la API" selecciona: **"Restringir clave"**
2. Busca y selecciona: **"Places API"**
3. Click en **"Guardar"** (abajo)

---

## ✅ Paso 5: Encontrar tu Place ID

Tienes 2 opciones:

### Opción A - Desde Google Maps (Más fácil):
1. Ve a [Google Maps](https://www.google.com/maps)
2. Busca tu negocio: "Fontaneria Low Cost"
3. Click en tu negocio
4. Mira la URL: `https://www.google.com/maps/place/.../@...`
5. Copia el código después de `!1s` → Ejemplo: `ChIJ...`

### Opción B - Herramienta de Google:
1. Ve a [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Busca tu negocio
3. Copia el **Place ID** que aparece

---

## ✅ Paso 6: Configurar Facturación (REQUERIDO pero GRATIS)

⚠️ **Google requiere una tarjeta pero NO te cobrará si no excedes $200/mes de uso**
- Tu sitio web usará ~$0.50/mes (básicamente GRATIS)
- Límite gratuito: $200/mes
- Solo te cobran SI superas ese límite

1. En Google Cloud Console, ve al menú ☰
2. **"Facturación"** → **"Vincular una cuenta de facturación"**
3. Click en **"Crear cuenta de facturación"**
4. Completa los datos:
   - Nombre de la cuenta
   - País
   - Información de pago (tarjeta de crédito/débito)
5. Acepta los términos
6. Click en **"Enviar y habilitar facturación"**

### 🔔 Configurar Alertas de Presupuesto (Recomendado):
1. En Facturación → **"Presupuestos y alertas"**
2. **"Crear presupuesto"**
3. Presupuesto: **$10 USD/mes**
4. Configurar alerta al 50%, 90%, 100%
5. Agregar tu email para recibir notificaciones

---

## ✅ Paso 7: Enviar la Información

**Envía esto al desarrollador (Guido):**

```
API Key: [Tu API Key aquí - empieza con AIzaSy...]
Place ID: [Tu Place ID aquí - empieza con ChIJ...]
```

**⚠️ IMPORTANTE**: Envía esta información por un canal seguro (no WhatsApp público, mejor email o mensaje privado)

---

## 📊 Costos Estimados

| Concepto | Costo |
|----------|-------|
| Primeros $200/mes | **GRATIS** |
| Tu uso estimado | **~$0.50/mes** |
| Probabilidad de pagar | **Muy baja** |

**Detalles técnicos:**
- Cada carga de reseñas: $0.017
- Visitas mensuales estimadas: ~30
- Costo mensual: ~$0.50

---

## 🔒 Seguridad

✅ API Key restringida por dominio (nadie puede usarla en otros sitios)
✅ API restringida solo a Places API
✅ Alertas de presupuesto configuradas
✅ Propiedad y control 100% tuyos

---

## ❓ Preguntas Frecuentes

**Q: ¿Me van a cobrar?**
A: No, a menos que tu sitio tenga miles de visitas diarias. Con tu tráfico actual, quedas dentro del nivel gratuito.

**Q: ¿Cuánto tiempo toma?**
A: Entre 10-15 minutos todo el proceso.

**Q: ¿Qué pasa si tengo problemas?**
A: Envía un screenshot del paso donde te quedaste y te ayudamos.

**Q: ¿Puedo usar mi cuenta personal de Gmail?**
A: Sí, perfectamente. Es tu proyecto y tu negocio.

---

## 📞 Soporte

Si tienes dudas en algún paso, contacta al desarrollador con:
- Screenshot del paso donde estás
- Descripción del problema
- Mensaje de error (si hay alguno)

---

## ⏱️ Timeline

Una vez tengas la API Key y Place ID:
- Implementación en el sitio: **1-2 horas**
- Pruebas: **30 minutos**
- Las reseñas aparecerán automáticamente en tu sitio web ✨

