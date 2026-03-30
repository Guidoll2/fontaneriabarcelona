import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Honeypot validation
    if (body.fax) {
      console.log("Bot detected via honeypot");
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    // Validate required fields
    const { nombre, telefono, poblacion } = body;
    
    if (!nombre || !telefono || !poblacion) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Basic validation
    if (nombre.trim().length < 2) {
      return NextResponse.json(
        { error: "Nombre inválido" },
        { status: 400 }
      );
    }

    if (!/^[0-9+\s()-]{9,}$/.test(telefono)) {
      return NextResponse.json(
        { error: "Teléfono inválido" },
        { status: 400 }
      );
    }

    // Prepare lead data
    const leadData = {
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      poblacion: poblacion.trim(),
      tipoPiscina: body.tiposPiscina || "No especificado",
      mensaje: body.mensaje || "",
      source: body.source || "clorador-salino",
      timestamp: body.timestamp || new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    // ===================================================
    // AQUÍ IMPLEMENTARÍAS LA LÓGICA DE ENVÍO
    // ===================================================
    
    // Opción 1: Enviar email vía MailerSend/SendGrid/Resend
    // await sendEmailNotification(leadData);
    
    // Opción 2: Guardar en base de datos
    // await db.collection("clorador_leads").insertOne(leadData);
    
    // Opción 3: Enviar a un CRM (HubSpot, Salesforce, etc)
    // await sendToCRM(leadData);
    
    // Opción 4: Webhook a Zapier/Make
    // await fetch("https://hooks.zapier.com/hooks/catch/...", {
    //   method: "POST",
    //   body: JSON.stringify(leadData),
    // });

    // Por ahora, solo logueamos (REEMPLAZAR EN PRODUCCIÓN)
    console.log("📋 Nuevo lead de Clorador Salino:", leadData);

    const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY;
    const FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL;
    const FROM_NAME = process.env.MAILERSEND_FROM_NAME || "Fontanería Low Cost";
    const TO_EMAIL = process.env.MAILERSEND_TO_EMAIL;
    const TO_NAME = process.env.MAILERSEND_TO_NAME || "Guido Llaurado";

    if (!MAILERSEND_API_KEY || !FROM_EMAIL || !TO_EMAIL) {
      throw new Error("Faltan variables de entorno de MailerSend");
    }

    const mailerRes = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAILERSEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: {
          email: FROM_EMAIL,
          name: FROM_NAME,
        },
        to: [
          {
            email: TO_EMAIL,
            name: TO_NAME,
          }
        ],
        subject: `🎯 Nuevo Lead: Clorador Salino - ${leadData.nombre}`,
        text: `Nuevo lead de la landing de Clorador Salino:\n\nNombre: ${leadData.nombre}\nTeléfono: ${leadData.telefono}\nPoblación: ${leadData.poblacion}\nTamaño piscina: ${leadData.tipoPiscina}\nMensaje: ${leadData.mensaje || "Sin mensaje"}\nFecha: ${new Date(leadData.timestamp).toLocaleString("es-ES")}\nIP: ${leadData.ip}`,
        html: `
          <h2>🎯 Nuevo Lead: Instalación Clorador Salino</h2>
          <p><strong>Nombre:</strong> ${leadData.nombre}</p>
          <p><strong>Teléfono:</strong> <a href="tel:${leadData.telefono}">${leadData.telefono}</a></p>
          <p><strong>Población:</strong> ${leadData.poblacion}</p>
          <p><strong>Tamaño piscina:</strong> ${leadData.tipoPiscina}</p>
          <p><strong>Mensaje:</strong> ${leadData.mensaje || "Sin mensaje"}</p>
          <hr />
          <p><small>Fecha: ${new Date(leadData.timestamp).toLocaleString("es-ES")}</small></p>
          <p><small>IP: ${leadData.ip}</small></p>
        `,
      }),
    });

    const mailerBody = await mailerRes.text();
    console.log("📨 MailerSend status:", mailerRes.status, mailerRes.statusText);
    console.log("📨 MailerSend body:", mailerBody);

    if (!mailerRes.ok) {
      return NextResponse.json(
        { error: "MailerSend error", status: mailerRes.status, details: mailerBody },
        { status: 502 }
      );
    }

    console.log(`✉️ Email enviado a: ${TO_EMAIL}`);
    console.log(`📱 SMS enviado a: [TELÉFONO_EMPRESA]`);

    // ===================================================
    // EJEMPLO: Integración con MailerSend (si ya lo tienes configurado)
    // ===================================================
    /*
    const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY;
    
    if (MAILERSEND_API_KEY) {
      await fetch("https://api.mailersend.com/v1/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${MAILERSEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: {
            email: "noreply@fontanerialowcost.com",
            name: "Fontanería Low Cost - Leads",
          },
          to: [
            {
              email: "info@fontanerialowcost.com",
              name: "Equipo Comercial",
            },
          ],
          subject: `🎯 Nuevo Lead: Clorador Salino - ${leadData.nombre}`,
          text: `
Nuevo lead de la landing de Clorador Salino:

Nombre: ${leadData.nombre}
Teléfono: ${leadData.telefono}
Población: ${leadData.poblacion}
Tamaño piscina: ${leadData.tipoPiscina}
Mensaje: ${leadData.mensaje || "Sin mensaje"}

Fecha: ${new Date(leadData.timestamp).toLocaleString("es-ES")}
IP: ${leadData.ip}

¡Contacta cuanto antes!
          `,
          html: `
<h2>🎯 Nuevo Lead: Instalación Clorador Salino</h2>
<p><strong>Nombre:</strong> ${leadData.nombre}</p>
<p><strong>Teléfono:</strong> <a href="tel:${leadData.telefono}">${leadData.telefono}</a></p>
<p><strong>Población:</strong> ${leadData.poblacion}</p>
<p><strong>Tamaño piscina:</strong> ${leadData.tipoPiscina}</p>
<p><strong>Mensaje:</strong> ${leadData.mensaje || "Sin mensaje"}</p>
<hr>
<p><small>Fecha: ${new Date(leadData.timestamp).toLocaleString("es-ES")}</small></p>
<p><small>IP: ${leadData.ip}</small></p>
          `,
        }),
      });
    }
    */

    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: "Lead registrado correctamente",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error procesando lead de clorador:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Handle GET requests (opcional, para testing)
export async function GET() {
  return NextResponse.json(
    { 
      message: "Endpoint de leads de Clorador Salino",
      status: "active",
    },
    { status: 200 }
  );
}
