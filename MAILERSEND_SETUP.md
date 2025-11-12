# Configuración de MailerSend para la Tienda Online

## 📧 Sistema de Emails Implementado

La tienda ahora envía automáticamente emails de confirmación cuando un cliente realiza un pedido.

### ✅ Funcionalidades

1. **Email al Cliente** (Comprador)
   - Confirmación del pedido
   - Número de orden único
   - Detalles de los productos
   - Información de contacto y dirección
   - Método de pago seleccionado
   - Total del pedido
   - Mensaje de agradecimiento

2. **Email al Propietario** (Dueño del sitio)
   - Notificación de nuevo pedido
   - Alerta de acción requerida
   - Todos los datos del cliente
   - Listado completo de productos
   - Método de pago preferido del cliente
   - Total del pedido

### 🔧 Configuración Requerida

El sistema ya está configurado para usar MailerSend. Solo necesitas verificar que las siguientes variables de entorno estén correctamente configuradas:

#### Variables de Entorno (`.env.local`)

```env
# MailerSend API Key
MAILERSEND_API_KEY=tu_api_key_de_mailersend

# Email del destinatario (propietario)
MAILERSEND_TO_EMAIL=fontanerialowcost24@gmail.com
```

### 📋 Cómo Obtener la API Key de MailerSend

1. Ve a [MailerSend](https://www.mailersend.com/)
2. Inicia sesión o crea una cuenta
3. Ve a **Settings** → **API Tokens**
4. Click en **Create Token**
5. Dale un nombre (ej: "Tienda Online")
6. Selecciona los permisos: **Email** (Send)
7. Copia el token generado
8. Pégalo en tu archivo `.env.local`

### 🎨 Diseño de los Emails

Los emails están diseñados con:
- ✅ HTML responsivo y profesional
- ✅ Colores corporativos del sitio
- ✅ Tabla de productos clara
- ✅ Información del cliente destacada
- ✅ Versión texto plano (fallback)
- ✅ Multiidioma (ES, EN, CA)

### 📊 Información que se Envía

**Datos del Cliente:**
- Nombre completo
- Email
- Teléfono
- Dirección completa (calle, ciudad, código postal)
- Notas adicionales (opcional)
- Método de pago preferido

**Datos del Pedido:**
- Número de orden único
- Fecha y hora
- Lista de productos con cantidades
- Precios individuales y totales
- Total del pedido

**Métodos de Pago Disponibles:**
- 💳 Transferencia Bancaria
- 💵 Efectivo
- 💳 Tarjeta de Crédito/Débito

### 🔒 Seguridad

- ✅ Rate limiting: Máximo 3 pedidos por minuto por IP
- ✅ Validación de campos requeridos
- ✅ Protección contra spam
- ✅ API Key en variables de entorno (nunca expuesta)

### 🧪 Cómo Probar

1. Asegúrate de que las variables de entorno estén configuradas
2. Ve a la tienda: `/es/tienda`
3. Agrega productos al carrito
4. Ve al checkout
5. Completa el formulario con tus datos
6. Selecciona un método de pago
7. Click en "Finalizar Compra"
8. Revisa:
   - Email del cliente (al email que pusiste en el formulario)
   - Email del propietario (al email configurado en `MAILERSEND_TO_EMAIL`)

### 📱 Flujo Completo

```
1. Cliente agrega productos → Carrito
2. Cliente va al Checkout
3. Cliente completa formulario
   ├─ Nombre
   ├─ Email
   ├─ Teléfono
   ├─ Dirección
   ├─ Ciudad
   ├─ Código Postal
   ├─ Notas (opcional)
   └─ Método de Pago
4. Cliente hace click en "Finalizar Compra"
5. Sistema envía datos a /api/orders
6. API valida los datos
7. API genera número de orden único
8. API envía 2 emails:
   ├─ Email al cliente (confirmación)
   └─ Email al propietario (notificación)
9. Cliente ve página de confirmación
10. Carrito se vacía automáticamente
```

### 🎯 Próximos Pasos (Recomendados)

Para convertir esto en una tienda real con pagos:

1. **Integrar Stripe o PayPal**
   - Procesar pagos con tarjeta
   - Generar facturas automáticas
   - Confirmación de pago

2. **Base de Datos**
   - Almacenar pedidos en BD
   - Historial de pedidos
   - Estado del pedido (pendiente, en proceso, completado)

3. **Panel de Administración**
   - Ver todos los pedidos
   - Cambiar estado de pedidos
   - Gestión de inventario

4. **Notificaciones Adicionales**
   - SMS al cliente
   - WhatsApp Business API
   - Notificaciones push

### 💡 Uso Actual

Por ahora, la tienda funciona como un **catálogo con sistema de pedidos por email**. El flujo es:

1. Cliente hace el pedido online
2. Tanto el cliente como el propietario reciben emails con toda la información
3. El propietario contacta al cliente para:
   - Confirmar disponibilidad
   - Coordinar instalación
   - Acordar forma de pago final
   - Cerrar el trato

Esto es perfecto para empezar y validar el interés sin necesidad de integrar un procesador de pagos completo.

### 📝 Notas Importantes

- Los emails se envían automáticamente al hacer un pedido
- El cliente recibe una copia de su pedido por email
- El propietario recibe notificación con todos los detalles
- El método de pago es solo una preferencia (no se procesa el pago online)
- La tienda está oculta del menú (solo accesible por URL directa)

---

**¡El sistema de emails está listo para usar!** 🚀

Solo necesitas configurar las variables de entorno y probar.
