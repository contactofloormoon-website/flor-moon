import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

type DJ = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  bio: string | null;
  location: string | null;
  genres: string | null;
  highlights: string | null;
  labels: string | null;
  email: string | null;
  createdAt: string;
  updatedAt: string;
};

type Hero = {
  id: string;
  djId: string;
  backgroundImage: string | null;
  logo: string | null;
  showLogo: number;
  artistName: string | null;
  tagline: string | null;
  position: string;
  logoSize: number;
  overlayOpacity: number;
  showButtons: number;
};

type Event = {
  id: string;
  djId: string;
  date: string;
  city: string;
  venue: string;
  promoter: string;
};

type Music = {
  id: string;
  djId: string;
  url: string;
  platform: string;
  isFeatured: number;
  order: number;
};

type Gallery = {
  id: string;
  djId: string;
  url: string;
  alt: string | null;
  order: number;
};

type Rider = {
  id: string;
  djId: string;
  item: string;
  requirement: string;
  order: number;
};

type Contact = {
  id: string;
  djId: string;
  email: string | null;
  instagram: string | null;
  soundcloud: string | null;
  spotify: string | null;
  showBookingButton: number;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const dbPath = path.join(process.cwd(), "dev.db");
    const db = new Database(dbPath);
    
    const dj = db.prepare(`
      SELECT * FROM dj WHERE slug = ?
    `).get(slug) as DJ | undefined;
    
    if (!dj) {
      db.close();
      return NextResponse.json({ error: "DJ not found" }, { status: 404 });
    }
    
    const hero = db.prepare(`
      SELECT * FROM hero WHERE djId = ?
    `).get(dj.id) as Hero | undefined;
    
    const events = db.prepare(`
      SELECT * FROM event WHERE djId = ? ORDER BY date ASC
    `).all(dj.id) as Event[];
    
    const music = db.prepare(`
      SELECT * FROM music WHERE djId = ? ORDER BY "order" ASC
    `).all(dj.id) as Music[];
    
    const gallery = db.prepare(`
      SELECT * FROM gallery WHERE djId = ? ORDER BY "order" ASC
    `).all(dj.id) as Gallery[];
    
    const rider = db.prepare(`
      SELECT * FROM rider WHERE djId = ? ORDER BY "order" ASC
    `).all(dj.id) as Rider[];
    
    const contact = db.prepare(`
      SELECT * FROM contact WHERE djId = ?
    `).get(dj.id) as Contact | undefined;
    
    db.close();
    
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