"use client";

import { useEffect, useState } from "react";

interface AboutConfig {
  bio: string | null;
  location: string | null;
  genres: string | null;
  highlights: string | null;
  labels: string | null;
}

export default function About() {
  const [config, setConfig] = useState<AboutConfig | null>(null);

  useEffect(() => {
    const slug = window.location.pathname === "/" ? "default" : window.location.pathname.slice(1);
    
    fetch(`/api/dj/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setConfig({
          bio: data.bio || null,
          location: data.location || null,
          genres: data.genres || null,
          highlights: data.highlights || null,
          labels: data.labels || null,
        });
      })
      .catch((err) => console.error("Error loading about:", err));
  }, []);

  if (!config || (!config.bio && !config.location && !config.genres)) {
    return null;
  }

  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-black/95">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Sobre mí
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            {config.bio && (
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {config.bio}
              </p>
            )}
            <div className="space-y-3">
              {config.location && (
                <div>
                  <span className="text-white font-semibold">📍 Ubicación:</span>
                  <span className="text-gray-400 ml-2">{config.location}</span>
                </div>
              )}
              {config.genres && (
                <div>
                  <span className="text-white font-semibold">🎧 Géneros:</span>
                  <span className="text-gray-400 ml-2">{config.genres}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {config.highlights && (
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Eventos destacados
                </h3>
                <p className="text-gray-400">{config.highlights}</p>
              </div>
            )}
            {config.labels && (
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Labels / Supports
                </h3>
                <p className="text-gray-400">{config.labels}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}