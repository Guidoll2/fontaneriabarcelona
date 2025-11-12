# Tienda Online - Fontanería Barcelona

## 🛒 Funcionalidades Implementadas

### ✅ Páginas Creadas

1. **`/[locale]/tienda`** - Página principal de la tienda
   - Galería de productos estilo Shopify
   - Cards con efecto glass (fondo translúcido)
   - Imágenes de calderas con overlay gradiente
   - Botones de "Agregar al Carrito" y "Comprar Ahora"
   - Badges de instalación incluida
   - Sección de confianza con garantías
   - **NUEVO:** Sección "Dudas/Consultas" con botones de contacto (WhatsApp, Teléfono, Email)

2. **`/[locale]/checkout`** - Página de checkout
   - Resumen del pedido
   - Lista de productos en el carrito
   - Controles de cantidad (+/-)
   - Formulario de dirección de envío
   - **NUEVO:** Selector de método de pago preferido (Transferencia, Efectivo, Tarjeta)
   - Cálculo de totales
   - Página de confirmación de pedido
   - **NUEVO:** Envío automático de emails de confirmación

### 🎨 Componentes Nuevos

1. **`ProductCard.tsx`** - Card de producto
   - Diseño con efecto glass
   - Imagen de fondo con overlay
   - Precio destacado
   - Badge de instalación incluida
   - Botones de acción con iconos
   - Notificación al agregar al carrito

2. **`CartIcon.tsx`** - Icono del carrito
   - Badge con contador de productos
   - Efecto glass
   - Animaciones con Framer Motion
   - Link directo al checkout

3. **`lib/cart-context.tsx`** - Contexto del carrito
   - Estado global del carrito
   - Funciones: agregar, eliminar, actualizar cantidad
   - Persistencia en localStorage
   - Cálculo de totales automático

4. **`app/api/orders/route.ts`** - API para procesar pedidos
   - **NUEVO:** Integración con MailerSend
   - Envío de emails de confirmación al cliente
   - Envío de emails de notificación al propietario
   - Rate limiting (3 pedidos por minuto)
   - Validación de datos
   - Generación de número de orden único

### 🎯 Header Actualizado

- ~~Se agregó el link "Tienda" junto a "Calderas"~~ **REMOVIDO** (oculto del menú público)
- La tienda es accesible solo mediante URL directa: `/[locale]/tienda`
- Multiidioma (Español, Inglés, Catalán)

### 🌐 Multiidioma

Todas las páginas y componentes soportan:
- Español (es)
- Inglés (en)
- Catalán (ca)

### 📱 Responsive Design

- Mobile first
- Adaptado para tablets y desktop
- Grid responsive en la galería de productos

## 🎨 Estética y Diseño

### Colores
- Fondo: Gradiente suave (secondary-50 → white → primary-50)
- Cards: Efecto glass (white/80 con backdrop-blur)
- Primario: primary-600 (azul)
- Secundario: secondary-900 (gris oscuro)
- Acento: accent-500 (verde/turquesa)

### Efectos
- **Glass Effect**: `bg-white/80 backdrop-blur-sm`
- **Hover**: Elevación de cards con `y: -8`
- **Shadows**: Suaves y profesionales
- **Animaciones**: Framer Motion para transiciones fluidas

## 🔧 Productos Actuales (Mock Data)

Se crearon 6 productos de ejemplo:
1. Caldera de Condensación 24kW - €1,200
2. Caldera de Condensación 30kW - €1,450
3. Caldera Mixta 24kW - €1,350
4. Caldera de Bajo NOx 28kW - €1,550
5. Caldera Estanca 20kW - €1,100
6. Caldera Premium 35kW - €1,800

**Todos incluyen instalación profesional**

## 📦 Estado del Carrito

El carrito utiliza:
- **Context API** de React para estado global
- **localStorage** para persistencia entre sesiones
- Actualización automática del contador en el icono

## 📧 Sistema de Emails (MailerSend)

### Emails Automáticos

Cuando un cliente realiza un pedido, se envían automáticamente:

1. **Email al Cliente** ✉️
   - Confirmación del pedido
   - Número de orden único
   - Detalles completos de productos
   - Información de contacto y dirección
   - Método de pago seleccionado
   - Total del pedido

2. **Email al Propietario** 🔔
   - Notificación de nuevo pedido
   - Alerta de acción requerida
   - Todos los datos del cliente
   - Listado de productos
   - Método de pago preferido
   - Total del pedido

### Configuración Requerida

Ver archivo `MAILERSEND_SETUP.md` para instrucciones completas.

Variables de entorno necesarias:
```env
MAILERSEND_API_KEY=tu_api_key
MAILERSEND_TO_EMAIL=fontanerialowcost24@gmail.com
```

### Métodos de Pago Disponibles

El cliente puede seleccionar su método de pago preferido:
- 💳 **Transferencia Bancaria**
- 💵 **Efectivo**
- 💳 **Tarjeta de Crédito/Débito**

> **Nota:** Los pagos NO se procesan online. El método seleccionado es solo una preferencia que ayuda al propietario a coordinar con el cliente.

## 🚀 Próximos Pasos (Backend)

### Opción 1: Sistema Actual (Recomendado para empezar)

**✅ Ya implementado:** La tienda funciona como catálogo con sistema de pedidos por email.

**Flujo:**
1. Cliente hace pedido online
2. Cliente y propietario reciben emails automáticos
3. Propietario contacta al cliente para:
   - Confirmar disponibilidad
   - Coordinar instalación
   - Acordar pago final
   - Cerrar el trato

**Ventajas:**
- ✅ Sin costos de procesamiento de pagos
- ✅ Control total sobre cada venta
- ✅ Flexibilidad en precios y condiciones
- ✅ No requiere integración con pasarelas de pago

### Opción 2: Integración de Pagos Online (Futuro)

Para conectar con procesamiento de pagos real, necesitarás:

1. **Pasarela de Pagos**
   - Stripe
   - PayPal
   - Redsys (España)

2. **Base de Datos**
   - Tabla de productos (id, name, price, image, description, stock)
   - Tabla de pedidos (id, customerId, items, status, paymentId)
   - Tabla de clientes (id, name, email, phone, address)

3. **Backend Adicional**
   ```typescript
   POST /api/payments/create-intent
   POST /api/payments/confirm
   GET  /api/orders/:orderId
   ```

4. **Notificaciones Extendidas**
   - Confirmación de pago
   - Actualización de estado
   - Recordatorios de instalación

## 📱 Cómo Usar

1. **Acceder a la tienda**: Ve directamente a `/es/tienda` (no aparece en el menú)
2. **Ver productos**: Scroll por la galería
3. **Agregar al carrito**: Click en "Agregar al Carrito"
4. **Ver carrito**: Click en el icono del carrito (esquina superior derecha)
5. **Checkout**: Completar formulario con:
   - Datos personales (nombre, email, teléfono)
   - Dirección de instalación
   - Método de pago preferido
   - Notas adicionales (opcional)
6. **Finalizar**: Click en "Finalizar Compra"
7. **Confirmación**: Recibirás un email con los detalles del pedido

## 🔒 Validación del Formulario

Campos requeridos en checkout:
- ✅ Nombre completo
- ✅ Email
- ✅ Teléfono
- ✅ Dirección
- ✅ Ciudad
- ✅ Código Postal
- ✅ Método de Pago
- ⚪ Notas (opcional)

## ✨ Características Destacadas

- ✅ Diseño profesional y moderno
- ✅ Efecto glass en todas las cards
- ✅ Animaciones suaves con Framer Motion
- ✅ Totalmente responsive
- ✅ Multiidioma completo (ES, EN, CA)
- ✅ UX optimizada (notificaciones, feedback visual)
- ✅ Persistencia del carrito
- ✅ Contador en tiempo real
- ✅ **Sistema de emails automáticos con MailerSend**
- ✅ **Selector de método de pago**
- ✅ **Sección de consultas con contacto directo**
- ✅ **Oculta del menú público (acceso solo por URL)**

## 📁 Estructura de Archivos

```
app/
  [locale]/
    tienda/
      page.tsx          ← Página de la tienda (con sección Dudas/Consultas)
    checkout/
      page.tsx          ← Página de checkout (con selector de pago)
    layout.tsx          ← Layout con CartProvider
  api/
    orders/
      route.ts          ← API para procesar pedidos y enviar emails

components/
  ProductCard.tsx       ← Card de producto
  CartIcon.tsx          ← Icono del carrito
  Header.tsx            ← Header (sin link a tienda)

lib/
  cart-context.tsx      ← Contexto del carrito
```

## 🎨 Clases CSS Principales

- `.btn-primary` - Botón primario
- `.btn-secondary` - Botón secundario
- `.input-base` - Input estándar
- `.container-custom` - Contenedor responsive
- Efecto glass: `bg-white/80 backdrop-blur-sm`

---

**¡La tienda está completamente funcional con sistema de emails automáticos!** 🚀

### 📋 Checklist Final

- ✅ Tienda creada con galería de productos
- ✅ Sistema de carrito funcional
- ✅ Checkout con formulario completo
- ✅ Selector de método de pago
- ✅ Integración con MailerSend
- ✅ Emails automáticos al cliente y propietario
- ✅ Sección de consultas en la tienda
- ✅ Oculta del menú público
- ✅ Multiidioma completo
- ✅ Responsive design
- ✅ Efectos glass profesionales

### 🎯 Para Activar

1. Configura las variables de entorno (ver `MAILERSEND_SETUP.md`)
2. Comparte la URL con el cliente: `/es/tienda`
3. ¡Listo para recibir pedidos!

### � Soporte

Cualquier duda, revisa:
- `TIENDA_README.md` - Documentación general de la tienda
- `MAILERSEND_SETUP.md` - Configuración de emails


