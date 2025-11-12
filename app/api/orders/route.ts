import { NextResponse } from "next/server";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  installationIncluded: boolean;
};

type CustomerData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
  paymentMethod: string;
};

type OrderRequest = {
  items: OrderItem[];
  customer: CustomerData;
  totalPrice: number;
  locale: string;
};

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const LIMIT = 3; // Limit orders to 3 per minute
const rateMap = new Map<string, number[]>();

function getIp(req: Request) {
  return (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown").split(",")[0];
}

function getPaymentMethodLabel(method: string, locale: string) {
  const labels: Record<string, Record<string, string>> = {
    transferencia: {
      es: 'Transferencia Bancaria',
      en: 'Bank Transfer',
      ca: 'Transferència Bancària'
    },
    efectivo: {
      es: 'Efectivo',
      en: 'Cash',
      ca: 'Efectiu'
    },
    tarjeta: {
      es: 'Tarjeta de Crédito/Débito',
      en: 'Credit/Debit Card',
      ca: 'Targeta de Crèdit/Dèbit'
    }
  };
  return labels[method]?.[locale] || method;
}

async function sendOrderEmails(orderData: OrderRequest) {
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || "",
  });

  const sentFrom = new Sender(
    "info@fontaneriaipiscinas.com",
    "Fontanería Low Cost - Tienda Online"
  );

  const { items, customer, totalPrice, locale } = orderData;

  // Generate order number
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const orderDate = new Date().toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'ca' ? 'ca-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Generate products list HTML
  const productsListHTML = items.map(item => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px 8px;">
        <strong>${item.name}</strong><br>
        <small style="color: #6b7280;">${item.description}</small>
      </td>
      <td style="padding: 12px 8px; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px 8px; text-align: right;">€${item.price.toLocaleString()}</td>
      <td style="padding: 12px 8px; text-align: right; font-weight: bold;">€${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `).join('');

  const productsListText = items.map(item => 
    `${item.quantity}x ${item.name} - €${item.price.toLocaleString()} = €${(item.price * item.quantity).toLocaleString()}`
  ).join('\n');

  // Email content based on locale
  const content = locale === 'en' ? {
    ownerSubject: `🛒 New Order #${orderNumber}`,
    customerSubject: `✅ Order Confirmation #${orderNumber}`,
    orderDetails: 'Order Details',
    customerInfo: 'Customer Information',
    shippingAddress: 'Installation Address',
    paymentMethod: 'Payment Method',
    product: 'Product',
    quantity: 'Qty',
    price: 'Price',
    total: 'Total',
    subtotal: 'Subtotal',
    orderTotal: 'Order Total',
    customerThankYou: 'Thank you for your purchase!',
    customerMessage: 'We have received your order and will contact you soon to confirm the details and schedule the installation.',
    ownerMessage: 'A new order has been received from the online store.',
    needAction: 'Action Required: Contact the customer to confirm the order and schedule installation.'
  } : locale === 'ca' ? {
    ownerSubject: `🛒 Nova Comanda #${orderNumber}`,
    customerSubject: `✅ Confirmació de Comanda #${orderNumber}`,
    orderDetails: 'Detalls de la Comanda',
    customerInfo: 'Informació del Client',
    shippingAddress: 'Adreça d\'Instal·lació',
    paymentMethod: 'Mètode de Pagament',
    product: 'Producte',
    quantity: 'Qty',
    price: 'Preu',
    total: 'Total',
    subtotal: 'Subtotal',
    orderTotal: 'Total Comanda',
    customerThankYou: 'Gràcies per la teva compra!',
    customerMessage: 'Hem rebut la teva comanda i ens posarem en contacte aviat per confirmar els detalls i programar la instal·lació.',
    ownerMessage: 'S\'ha rebut una nova comanda des de la botiga en línia.',
    needAction: 'Acció Requerida: Contactar amb el client per confirmar la comanda i programar la instal·lació.'
  } : {
    ownerSubject: `🛒 Nuevo Pedido #${orderNumber}`,
    customerSubject: `✅ Confirmación de Pedido #${orderNumber}`,
    orderDetails: 'Detalles del Pedido',
    customerInfo: 'Información del Cliente',
    shippingAddress: 'Dirección de Instalación',
    paymentMethod: 'Método de Pago',
    product: 'Producto',
    quantity: 'Cant.',
    price: 'Precio',
    total: 'Total',
    subtotal: 'Subtotal',
    orderTotal: 'Total del Pedido',
    customerThankYou: '¡Gracias por tu compra!',
    customerMessage: 'Hemos recibido tu pedido y nos pondremos en contacto pronto para confirmar los detalles y programar la instalación.',
    ownerMessage: 'Se ha recibido un nuevo pedido desde la tienda online.',
    needAction: 'Acción Requerida: Contactar al cliente para confirmar el pedido y programar la instalación.'
  };

  // HTML Email Template
  const generateEmailHTML = (isOwner: boolean) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
            ${isOwner ? '🛒 ' + content.ownerSubject : '✅ ' + content.customerThankYou}
          </h1>
          ${!isOwner ? `<p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">${content.customerMessage}</p>` : ''}
        </div>

        <!-- Content -->
        <div style="padding: 40px 20px;">
          ${isOwner ? `
            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
              <p style="margin: 0; color: #92400e; font-weight: 600;">⚠️ ${content.needAction}</p>
            </div>
          ` : ''}

          <!-- Order Info -->
          <div style="margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Pedido #</p>
            <p style="margin: 0; color: #111827; font-size: 20px; font-weight: bold;">${orderNumber}</p>
            <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 14px;">${orderDate}</p>
          </div>

          <!-- Customer Information -->
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <h2 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: bold;">${content.customerInfo}</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 40%;">Nombre:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${customer.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${customer.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Teléfono:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${customer.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">${content.shippingAddress}:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${customer.address}, ${customer.city}, ${customer.postalCode}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">${content.paymentMethod}:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${getPaymentMethodLabel(customer.paymentMethod, locale)}</td>
              </tr>
              ${customer.notes ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Notas:</td>
                  <td style="padding: 8px 0; color: #111827;">${customer.notes}</td>
                </tr>
              ` : ''}
            </table>
          </div>

          <!-- Products Table -->
          <div style="margin-bottom: 24px;">
            <h2 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: bold;">${content.orderDetails}</h2>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background-color: #f9fafb;">
                  <th style="padding: 12px 8px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">${content.product}</th>
                  <th style="padding: 12px 8px; text-align: center; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">${content.quantity}</th>
                  <th style="padding: 12px 8px; text-align: right; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">${content.price}</th>
                  <th style="padding: 12px 8px; text-align: right; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">${content.total}</th>
                </tr>
              </thead>
              <tbody>
                ${productsListHTML}
              </tbody>
              <tfoot>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td colspan="3" style="padding: 16px 8px; text-align: right; font-weight: bold; color: #111827; font-size: 18px;">${content.orderTotal}</td>
                  <td style="padding: 16px 8px; text-align: right; font-weight: bold; color: #3b82f6; font-size: 20px;">€${totalPrice.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          ${!isOwner ? `
            <div style="background-color: #ecfdf5; border: 1px solid #6ee7b7; padding: 16px; border-radius: 8px; margin-top: 24px;">
              <p style="margin: 0; color: #065f46; font-size: 14px;">
                💚 Todos nuestros productos incluyen instalación profesional y garantía de 2 años.
              </p>
            </div>
          ` : ''}
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Fontanería Low Cost</p>
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">📞 677 133 242 | 📧 info@fontaneriaipiscinas.com</p>
          <p style="margin: 0; color: #9ca3af; font-size: 12px;">Servicio profesional en Barcelona y comarca</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Text version
  const generateEmailText = (isOwner: boolean) => `
${isOwner ? content.ownerSubject : content.customerSubject}

${isOwner ? content.needAction : content.customerMessage}

PEDIDO #${orderNumber}
Fecha: ${orderDate}

---
${content.customerInfo}
---
Nombre: ${customer.name}
Email: ${customer.email}
Teléfono: ${customer.phone}
${content.shippingAddress}: ${customer.address}, ${customer.city}, ${customer.postalCode}
${content.paymentMethod}: ${getPaymentMethodLabel(customer.paymentMethod, locale)}
${customer.notes ? `Notas: ${customer.notes}` : ''}

---
${content.orderDetails}
---
${productsListText}

${content.orderTotal}: €${totalPrice.toLocaleString()}

---
Fontanería Low Cost
📞 677 133 242
📧 info@fontaneriaipiscinas.com
  `;

  // Send email to owner
  const ownerRecipients = [
    new Recipient(
      process.env.MAILERSEND_TO_EMAIL || "fontanerialowcost24@gmail.com",
      "Propietario"
    )
  ];

  const ownerEmailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(ownerRecipients)
    .setSubject(content.ownerSubject)
    .setHtml(generateEmailHTML(true))
    .setText(generateEmailText(true));

  // Send email to customer
  const customerRecipients = [
    new Recipient(customer.email, customer.name)
  ];

  const customerEmailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(customerRecipients)
    .setSubject(content.customerSubject)
    .setHtml(generateEmailHTML(false))
    .setText(generateEmailText(false));

  // Send both emails
  await Promise.all([
    mailerSend.email.send(ownerEmailParams),
    mailerSend.email.send(customerEmailParams)
  ]);
}

export async function POST(req: Request) {
  try {
    const ip = getIp(req);
    const now = Date.now();
    
    // Rate limiting
    const timestamps = rateMap.get(ip) || [];
    const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
    
    if (recentTimestamps.length >= LIMIT) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    
    recentTimestamps.push(now);
    rateMap.set(ip, recentTimestamps);

    const body: OrderRequest = await req.json();

    // Validate required fields
    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    if (!body.customer?.name || !body.customer?.email || !body.customer?.phone || !body.customer?.address) {
      return NextResponse.json({ error: "Missing customer information" }, { status: 400 });
    }

    // Send emails
    await sendOrderEmails(body);

    return NextResponse.json({ 
      success: true, 
      message: "Order received successfully. Confirmation emails sent." 
    });

  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}
