import { NextResponse } from "next/server";

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
