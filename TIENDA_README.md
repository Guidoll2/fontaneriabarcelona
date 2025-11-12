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

2. **`/[locale]/checkout`** - Página de checkout
   - Resumen del pedido
   - Lista de productos en el carrito
   - Controles de cantidad (+/-)
   - Formulario de dirección de envío
   - Cálculo de totales
   - Página de confirmación de pedido

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

### 🎯 Header Actualizado

- Se agregó el link "Tienda" junto a "Calderas"
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

## 🚀 Próximos Pasos (Backend)

Para conectar con un backend real, necesitarás:

1. **API de Productos**
   ```typescript
   GET /api/products
   GET /api/products/:id
   ```

2. **API de Pedidos**
   ```typescript
   POST /api/orders
   {
     items: CartItem[],
     customer: FormData,
     totalPrice: number
   }
   ```

3. **Base de Datos**
   - Tabla de productos (id, name, price, image, description, installationIncluded)
   - Tabla de pedidos (id, customerId, items, status, createdAt)
   - Tabla de clientes (id, name, email, phone, address)

4. **Procesamiento de Pagos**
   - Integración con Stripe, PayPal, o similar

5. **Notificaciones**
   - Email de confirmación al cliente
   - Email de notificación al administrador

## 📱 Cómo Usar

1. **Navegar a la tienda**: Click en "Tienda" en el header
2. **Ver productos**: Scroll por la galería
3. **Agregar al carrito**: Click en "Agregar al Carrito"
4. **Ver carrito**: Click en el icono del carrito (esquina superior derecha)
5. **Checkout**: Completar formulario y "Finalizar Compra"

## 🔒 Validación del Formulario

Campos requeridos en checkout:
- Nombre completo
- Email
- Teléfono
- Dirección
- Ciudad
- Código Postal

## ✨ Características Destacadas

- ✅ Diseño profesional y moderno
- ✅ Efecto glass en todas las cards
- ✅ Animaciones suaves con Framer Motion
- ✅ Totalmente responsive
- ✅ Multiidioma completo
- ✅ UX optimizada (notificaciones, feedback visual)
- ✅ Persistencia del carrito
- ✅ Contador en tiempo real

## 📁 Estructura de Archivos

```
app/
  [locale]/
    tienda/
      page.tsx          ← Página de la tienda
    checkout/
      page.tsx          ← Página de checkout
    layout.tsx          ← Layout con CartProvider

components/
  ProductCard.tsx       ← Card de producto
  CartIcon.tsx          ← Icono del carrito
  Header.tsx            ← Header actualizado

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

**¡Todo listo para empezar a vender calderas!** 🚀
