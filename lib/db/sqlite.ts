import Database from "better-sqlite3";

const db = new Database("dev.db");

// Crear tablas
db.exec(`
  CREATE TABLE IF NOT EXISTS dj (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE,
    name TEXT,
    tagline TEXT,
    bio TEXT,
    location TEXT,
    genres TEXT,
    highlights TEXT,
    labels TEXT,
    email TEXT
  );

  CREATE TABLE IF NOT EXISTS hero (
    id TEXT PRIMARY KEY,
    djId TEXT UNIQUE,
    backgroundImage TEXT,
    logo TEXT,
    showLogo INTEGER,
    artistName TEXT,
    tagline TEXT,
    position TEXT,
    logoSize INTEGER,
    overlayOpacity REAL,
    showButtons INTEGER,
    FOREIGN KEY (djId) REFERENCES dj(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS event (
    id TEXT PRIMARY KEY,
    djId TEXT,
    date TEXT,
    city TEXT,
    venue TEXT,
    promoter TEXT,
    FOREIGN KEY (djId) REFERENCES dj(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS music (
    id TEXT PRIMARY KEY,
    djId TEXT,
    url TEXT,
    platform TEXT,
    isFeatured INTEGER,
    "order" INTEGER,
    FOREIGN KEY (djId) REFERENCES dj(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id TEXT PRIMARY KEY,
    djId TEXT,
    url TEXT,
    alt TEXT,
    "order" INTEGER,
    FOREIGN KEY (djId) REFERENCES dj(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS rider (
    id TEXT PRIMARY KEY,
    djId TEXT,
    item TEXT,
    requirement TEXT,
    "order" INTEGER,
    FOREIGN KEY (djId) REFERENCES dj(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS contact (
    id TEXT PRIMARY KEY,
    djId TEXT UNIQUE,
    email TEXT,
    instagram TEXT,
    soundcloud TEXT,
    spotify TEXT,
    showBookingButton INTEGER,
    FOREIGN KEY (djId) REFERENCES dj(id) ON DELETE CASCADE
  );
`);

export default db;