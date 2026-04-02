import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dj = await prisma.dJ.upsert({
    where: { slug: "flor-moon" },
    update: {},
    create: {
      slug: "flor-moon",
      name: "FLOR MOON",
      tagline: "TECHNO & HYPNOTIC PULSE",
      bio: "DJ y productora de techno hipnótico con más de 10 años de experiencia. Resident en Club Mondo y fundadora de Groove Records.",
      location: "Buenos Aires, Argentina",
      genres: "Techno, Hypnotic, Industrial",
      highlights: "Resident en Club Mondo · Groove Records · Support: Richie Hawtin, Paula Temple",
      labels: "Groove Records, Hypnotic State, Dark Matter",
      email: "booking@flormoon.com",
      hero: {
        create: {
          backgroundImage: "/hero-bg.jpg",
          backgroundType: "image",
          showLogo: true,
          useTextInstead: false,
          artistName: "FLOR MOON",
          tagline: "TECHNO & HYPNOTIC PULSE",
          position: "center",
          logoSize: 120,
          overlayOpacity: 0.4,
          showButtons: true,
        },
      },
      events: {
        create: [
          { date: new Date("2024-04-15"), city: "Buenos Aires", venue: "Club Mondo", promoter: "Groove Nights" },
          { date: new Date("2024-04-22"), city: "São Paulo", venue: "D-Edge", promoter: "Techno Union" },
          { date: new Date("2024-05-05"), city: "Mexico City", venue: "Foro Indierocks", promoter: "Hypnotic Sessions" },
        ],
      },
      music: {
        create: [
          { url: "https://spotify.com/artist/xxx", platform: "spotify", isFeatured: true, order: 0 },
          { url: "https://soundcloud.com/artist/xxx", platform: "soundcloud", isFeatured: false, order: 1 },
          { url: "https://youtube.com/watch?v=xxx", platform: "youtube", isFeatured: false, order: 2 },
        ],
      },
      gallery: {
        create: [
          { url: "/gallery/1.jpg", alt: "DJ en cabina", order: 0 },
          { url: "/gallery/2.jpg", alt: "Presentación en vivo", order: 1 },
          { url: "/gallery/3.jpg", alt: "Estudio", order: 2 },
        ],
      },
      rider: {
        create: [
          { item: "CDJs", requirement: "2x CDJ-2000 Nexus o superior", order: 0 },
          { item: "Mezclador", requirement: "DJM-900 Nexus o superior", order: 1 },
          { item: "Monitores", requirement: "2x Monitores de escenario", order: 2 },
        ],
      },
      contact: {
        create: {
          email: "booking@flormoon.com",
          instagram: "https://instagram.com/flormoon",
          soundcloud: "https://soundcloud.com/flormoon",
          spotify: "https://spotify.com/artist/flormoon",
          showBookingButton: true,
        },
      },
      sections: {
        create: {
          about: true,
          events: true,
          music: true,
          gallery: true,
          rider: true,
          contact: true,
        },
      },
    },
  });

  console.log("DJ creado:", dj.name);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());