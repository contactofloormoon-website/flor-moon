"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface HeroConfig {
  backgroundImage: string | null;
  backgroundType: string;
  logo: string | null;
  showLogo: boolean;
  useTextInstead: boolean;
  artistName: string;
  tagline: string;
  position: string;
  logoSize: number;
  overlayOpacity: number;
  showButtons: boolean;
}

export default function Hero() {
  const [config, setConfig] = useState<HeroConfig | null>(null);
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    // Obtener el slug de la URL (ej: /flor-moon)
    const pathname = window.location.pathname;
    const slugFromPath = pathname === "/" ? "default" : pathname.slice(1);
    setSlug(slugFromPath);

    // Cargar datos desde API
    fetch(`/api/dj/${slugFromPath}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.hero) {
          setConfig(data.hero);
        }
      })
      .catch((err) => console.error("Error loading hero:", err));
  }, []);

  if (!config) {
    return <div className="h-screen bg-black" />;
  }

  const positionClasses: Record<string, string> = {
    center: "items-center justify-center text-center",
    "top-center": "items-start justify-center text-center pt-12",
    "bottom-center": "items-end justify-center text-center pb-12",
    "left-center": "items-center justify-start text-left pl-12",
    "right-center": "items-center justify-end text-right pr-12",
    "bottom-left": "items-end justify-start text-left pb-12 pl-12",
    "bottom-right": "items-end justify-end text-right pb-12 pr-12",
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        {config.backgroundImage && (
          <Image
            src={config.backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        )}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: config.overlayOpacity }}
        />
      </div>

      <div
        className={`relative h-full w-full flex flex-col ${positionClasses[config.position] || positionClasses.center}`}
      >
        {config.showLogo && config.logo && (
          <div className="mb-4">
            <Image
              src={config.logo}
              alt="Logo"
              width={config.logoSize}
              height={config.logoSize}
              className="mx-auto"
            />
          </div>
        )}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
          {config.artistName}
        </h1>
        <p className="text-xl md:text-2xl text-white/80">{config.tagline}</p>
        {config.showButtons && (
          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition">
              ESCUCHAR
            </button>
            <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition">
              CONTACTAR
            </button>
          </div>
        )}
      </div>
    </section>
  );
}