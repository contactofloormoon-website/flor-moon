import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const isCloudflare = process.env.NODE_ENV === "production";
    let env = undefined;
    if (isCloudflare && (globalThis as any).env?.DB) {
      env = { DB: (globalThis as any).env.DB };
    }
    
    const db = await getDB(env);
    
    const dj = await db.queryOne(`
      SELECT * FROM dj WHERE slug = ?
    `, [slug]);
    
    if (!dj) {
      return NextResponse.json({ error: "DJ not found" }, { status: 404 });
    }
    
    const hero = await db.queryOne(`
      SELECT * FROM hero WHERE djId = ?
    `, [dj.id]);
    
    const events = await db.query(`
      SELECT * FROM event WHERE djId = ? ORDER BY date ASC
    `, [dj.id]);
    
    const music = await db.query(`
      SELECT * FROM music WHERE djId = ? ORDER BY "order" ASC
    `, [dj.id]);
    
    const gallery = await db.query(`
      SELECT * FROM gallery WHERE djId = ? ORDER BY "order" ASC
    `, [dj.id]);
    
    const rider = await db.query(`
      SELECT * FROM rider WHERE djId = ? ORDER BY "order" ASC
    `, [dj.id]);
    
    const contact = await db.queryOne(`
      SELECT * FROM contact WHERE djId = ?
    `, [dj.id]);
    
    return NextResponse.json({
      ...dj,
      hero,
      events,
      music,
      gallery,
      rider,
      contact,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}