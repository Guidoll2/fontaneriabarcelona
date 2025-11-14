import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force dynamic so we can fetch external resources at runtime
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const external = process.env.NEXT_PUBLIC_VALVE_GUIDE_URL;

    if (external && /^https?:\/\//i.test(external)) {
      const r = await fetch(external);
      if (!r.ok) {
        return NextResponse.json({ error: 'Failed to fetch external PDF' }, { status: r.status });
      }
      const arrayBuffer = await r.arrayBuffer();
      const filename = external.split('/').pop() || 'guia-valvulas-piscina.pdf';
      return new NextResponse(Buffer.from(arrayBuffer), {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }

    // Fallback to local file in public/docs
    const filePath = path.join(process.cwd(), 'public', 'docs', 'guia-valvulas-piscina.pdf');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'PDF not found' }, { status: 404 });
    }
    const data = await fs.promises.readFile(filePath);
    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="guia-valvulas-piscina.pdf"',
      },
    });
  } catch (err) {
    console.error('Error in /api/valve-guide:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
