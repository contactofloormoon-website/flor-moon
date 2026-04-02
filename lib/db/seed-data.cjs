const { randomUUID } = require("crypto");
const db = require("./sqlite").default;

const djId = randomUUID();

// Insertar DJ
db.prepare(`
  INSERT INTO dj (id, slug, name, tagline, bio, location, genres, highlights, labels, email)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`).run(
  djId,
  "flor-moon",
  "FLOR MOON",
  "TECHNO & HYPNOTIC PULSE",
  "DJ y productora de techno hipnótico con más de 10 años de experiencia.",
  "Buenos Aires, Argentina",
  "Techno, Hypnotic, Industrial",
  "Resident en Club Mondo · Groove Records",
  "Groove Records, Hypnotic State",
  "booking@flormoon.com"
);

// Insertar Hero
db.prepare(`
  INSERT INTO hero (id, djId, backgroundImage, logo, showLogo, artistName, tagline, position, logoSize, overlayOpacity, showButtons)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`).run(randomUUID(), djId, "/hero-bg.jpg", null, 1, "FLOR MOON", "TECHNO & HYPNOTIC PULSE", "center", 120, 0.4, 1);

// Insertar Events
const events = [
  ["2024-04-15", "Buenos Aires", "Club Mondo", "Groove Nights"],
  ["2024-04-22", "São Paulo", "D-Edge", "Techno Union"],
  ["2024-05-05", "Mexico City", "Foro Indierocks", "Hypnotic Sessions"],
];
for (const [date, city, venue, promoter] of events) {
  db.prepare(`INSERT INTO event (id, djId, date, city, venue, promoter) VALUES (?, ?, ?, ?, ?, ?)`)
    .run(randomUUID(), djId, date, city, venue, promoter);
}

// Insertar Music
const music = [
  ["https://spotify.com/artist/xxx", "spotify", 1, 0],
  ["https://soundcloud.com/artist/xxx", "soundcloud", 0, 1],
  ["https://youtube.com/watch?v=xxx", "youtube", 0, 2],
];
for (const [url, platform, isFeatured, order] of music) {
  db.prepare(`INSERT INTO music (id, djId, url, platform, isFeatured, "order") VALUES (?, ?, ?, ?, ?, ?)`)
    .run(randomUUID(), djId, url, platform, isFeatured, order);
}

// Insertar Gallery
const gallery = [
  ["/gallery/1.jpg", "DJ en cabina", 0],
  ["/gallery/2.jpg", "Presentación en vivo", 1],
  ["/gallery/3.jpg", "Estudio", 2],
];
for (const [url, alt, order] of gallery) {
  db.prepare(`INSERT INTO gallery (id, djId, url, alt, "order") VALUES (?, ?, ?, ?, ?)`)
    .run(randomUUID(), djId, url, alt, order);
}

// Insertar Rider
const rider = [
  ["CDJs", "2x CDJ-2000 Nexus o superior", 0],
  ["Mezclador", "DJM-900 Nexus o superior", 1],
  ["Monitores", "2x Monitores de escenario", 2],
];
for (const [item, requirement, order] of rider) {
  db.prepare(`INSERT INTO rider (id, djId, item, requirement, "order") VALUES (?, ?, ?, ?, ?)`)
    .run(randomUUID(), djId, item, requirement, order);
}

// Insertar Contact
db.prepare(`
  INSERT INTO contact (id, djId, email, instagram, soundcloud, spotify, showBookingButton)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`).run(randomUUID(), djId, "booking@flormoon.com", "https://instagram.com/flormoon", "https://soundcloud.com/flormoon", "https://spotify.com/artist/flormoon", 1);

console.log("Datos insertados correctamente");