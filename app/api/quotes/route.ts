import { NextResponse } from "next/server";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

type Req = {
  nombre?: string;
  email?: string;
  telefono?: string;
  servicio?: string;
  zona?: string;
  mensaje?: string;
  fax?: string;
  locale?: string;
};

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const LIMIT = 6;
const rateMap = new Map<string, number[]>();

function getIp(req: Request) {
  // best-effort; in Vercel use x-forwarded-for
  return (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown").split(",")[0];
}

async function sendEmailNotification(data: Req) {
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || "",
  });

  const sentFrom = new Sender(
    process.env.MAILERSEND_FROM_EMAIL || "",
    "Fontanería Low Cost - Formulario Web"
  );

  const recipients = [
    new Recipient(
      process.env.MAILERSEND_TO_EMAIL || "",
      "Propietario"
    )
  ];

  // Prepare email content
  const locale = data.locale || 'es';
  const subject = locale === 'es' 
    ? '🔧 Nueva consulta desde el sitio web' 
    : locale === 'en'
    ? '🔧 New inquiry from website'
    : '🔧 Nova consulta des del web';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #0066cc; display: block; margin-bottom: 5px; }
        .value { background-color: white; padding: 10px; border-left: 3px solid #0066cc; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>${subject}</h2>
        </div>
        <div class="content">
          ${data.nombre ? `
          <div class="field">
            <span class="label">Nombre:</span>
            <div class="value">${data.nombre}</div>
          </div>
          ` : ''}
          
          ${data.email ? `
          <div class="field">
            <span class="label">Email:</span>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          ` : ''}
          
          ${data.telefono ? `
          <div class="field">
            <span class="label">Teléfono:</span>
            <div class="value"><a href="tel:${data.telefono}">${data.telefono}</a></div>
          </div>
          ` : ''}
          
          ${data.servicio ? `
          <div class="field">
            <span class="label">Servicio:</span>
            <div class="value">${data.servicio}</div>
          </div>
          ` : ''}
          
          ${data.zona ? `
          <div class="field">
            <span class="label">Zona:</span>
            <div class="value">${data.zona}</div>
          </div>
          ` : ''}
          
          ${data.mensaje ? `
          <div class="field">
            <span class="label">Mensaje:</span>
            <div class="value">${data.mensaje}</div>
          </div>
          ` : ''}
          
          <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de fontanerialowcost.com</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
Nueva consulta desde el sitio web

${data.nombre ? `Nombre: ${data.nombre}\n` : ''}
${data.email ? `Email: ${data.email}\n` : ''}
${data.telefono ? `Teléfono: ${data.telefono}\n` : ''}
${data.servicio ? `Servicio: ${data.servicio}\n` : ''}
${data.zona ? `Zona: ${data.zona}\n` : ''}
${data.mensaje ? `Mensaje: ${data.mensaje}\n` : ''}

---
Este mensaje fue enviado desde el formulario de contacto de fontanerialowcost.com
  `;

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject(subject)
    .setHtml(htmlContent)
    .setText(textContent);

  // Add reply-to if customer email provided
  if (data.email) {
    emailParams.setReplyTo(new Sender(data.email, data.nombre || "Cliente"));
  }

  await mailerSend.email.send(emailParams);
}

export async function POST(req: Request) {
  try {
    const ip = getIp(req);
    const now = Date.now();
    const arr = rateMap.get(ip) || [];
    const recent = arr.filter((t) => now - t < RATE_LIMIT_WINDOW);
    if (recent.length >= LIMIT) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    recent.push(now);
    rateMap.set(ip, recent);

    const body: Req = await req.json();
    if (body.fax) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    if (body.email && !/^\S+@\S+\.\S+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Send email notification
    try {
      await sendEmailNotification(body);
    } catch (emailError: any) {
      console.error('Error sending email:', emailError);
      // Continue to save in DB even if email fails
    }

    // Dynamically import db to avoid build-time MongoDB connection
    const { getDb } = await import("../../../lib/db");
    const db = await getDb();
    const coll = db.collection("quotes");
    const doc = { ...body, createdAt: new Date(), ip };
    await coll.insertOne(doc as any);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
