import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, section, data } = body;
    
    const dbPath = path.join(process.cwd(), "dev.db");
    const db = new Database(dbPath);
    
    const dj = db.prepare("SELECT id FROM dj WHERE slug = ?").get(slug) as { id: string } | undefined;
    
    if (!dj) {
      db.close();
      return NextResponse.json({ error: "DJ not found" }, { status: 404 });
    }
    
    if (section === "perfil") {
      db.prepare(`
        UPDATE dj SET name = ?, tagline = ?, bio = ?, location = ?, genres = ?, highlights = ?, labels = ?, email = ?, updatedAt = ?
        WHERE id = ?
      `).run(data.name, data.tagline, data.bio, data.location, data.genres, data.highlights, data.labels, data.email, new Date().toISOString(), dj.id);
    }
    
    if (section === "hero") {
      const existing = db.prepare("SELECT id FROM hero WHERE djId = ?").get(dj.id);
      if (existing) {
        db.prepare(`
          UPDATE hero SET artistName = ?, tagline = ?, position = ?, logoSize = ?, overlayOpacity = ?, showButtons = ?
          WHERE djId = ?
        `).run(data.artistName, data.tagline, data.position, data.logoSize, data.overlayOpacity, data.showButtons ? 1 : 0, dj.id);
      } else {
        db.prepare(`
          INSERT INTO hero (id, djId, artistName, tagline, position, logoSize, overlayOpacity, showButtons)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(crypto.randomUUID(), dj.id, data.artistName, data.tagline, data.position, data.logoSize, data.overlayOpacity, data.showButtons ? 1 : 0);
      }
    }
    
    db.close();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}