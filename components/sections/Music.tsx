"use client";

import { useEffect, useState } from "react";

interface MusicLink {
  id: string;
  url: string;
  platform: string;
  isFeatured: boolean;
}

export default function Music() {
  const [links, setLinks] = useState<MusicLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = window.location.pathname === "/" ? "default" : window.location.pathname.slice(1);
    
    fetch(`/api/dj/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.music && data.music.length > 0) {
          setLinks(data.music);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading music:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (links.length === 0) return null;

  const getPlatformConfig = (platform: string) => {
    const configs: Record<string, { name: string; bgColor: string; icon: string }> = {
      spotify: { name: "Spotify", bgColor: "bg-[#1DB954]", icon: "🎵" },
      soundcloud: { name: "SoundCloud", bgColor: "bg-[#FF5500]", icon: "☁️" },
      youtube: { name: "YouTube", bgColor: "bg-[#FF0000]", icon: "▶️" },
      beatport: { name: "Beatport", bgColor: "bg-[#00A9FF]", icon: "🎧" },
      apple: { name: "Apple Music", bgColor: "bg-[#FA243C]", icon: "🍎" },
    };
    return configs[platform] || { name: platform, bgColor: "bg-gray-600", icon: "🔗" };
  };

  const featuredLink = links.find((l) => l.isFeatured);
  const secondaryLinks = links.filter((l) => !l.isFeatured);

  return (
    <section id="music" className="py-20 px-4 md:px-8 bg-black/95">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Música
        </h2>

        {featuredLink && (
          <div className="mb-12">
            <div className="text-sm text-white/60 mb-3 text-center">DESTACADO</div>
            <a
              href={featuredLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${getPlatformConfig(featuredLink.platform).bgColor} hover:opacity-90 transition rounded-xl p-6 flex items-center justify-between group`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{getPlatformConfig(featuredLink.platform).icon}</span>
                <div>
                  <div className="text-white font-bold text-xl">
                    {getPlatformConfig(featuredLink.platform).name}
                  </div>
                  <div className="text-white/70 text-sm">Escuchar lo último</div>
                </div>
              </div>
              <span className="text-white text-2xl group-hover:translate-x-1 transition">→</span>
            </a>
          </div>
        )}

        {secondaryLinks.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {secondaryLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${getPlatformConfig(link.platform).bgColor} hover:opacity-90 transition rounded-lg p-4 text-center`}
              >
                <span className="text-2xl block mb-1">{getPlatformConfig(link.platform).icon}</span>
                <span className="text-white text-sm font-medium">
                  {getPlatformConfig(link.platform).name}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}