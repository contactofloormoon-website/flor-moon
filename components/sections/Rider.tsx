"use client";

import { useEffect, useState } from "react";

interface RiderItem {
  id: string;
  item: string;
  requirement: string;
}

export default function Rider() {
  const [riderItems, setRiderItems] = useState<RiderItem[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = window.location.pathname === "/" ? "default" : window.location.pathname.slice(1);
    
    fetch(`/api/dj/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.rider && data.rider.length > 0) {
          setRiderItems(data.rider);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading rider:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (riderItems.length === 0) return null;

  const displayedItems = expanded ? riderItems : riderItems.slice(0, 3);

  const handleDownloadPDF = () => {
    alert("Descargando PDF del rider...");
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    alert("Enlace copiado al portapapeles");
  };

  return (
    <section id="rider" className="py-20 px-4 md:px-8 bg-black/95">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Rider Técnico
        </h2>

        <div className="rounded-lg border border-white/10 overflow-hidden mb-8">
          <div className="grid grid-cols-2 bg-white/5 p-4 border-b border-white/10">
            <div className="text-white font-semibold">Elemento</div>
            <div className="text-white font-semibold">Requerimiento</div>
          </div>
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-2 p-4 border-b border-white/5 hover:bg-white/5 transition"
            >
              <div className="text-white">{item.item}</div>
              <div className="text-white/70">{item.requirement}</div>
            </div>
          ))}
        </div>

        {riderItems.length > 3 && (
          <div className="text-center mb-8">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-white/60 hover:text-white transition"
            >
              {expanded ? "Ver menos ↑" : "Ver más ↓"}
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition"
          >
            📄 Descargar PDF
          </button>
          <button
            onClick={handleShare}
            className="px-6 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition"
          >
            🔗 Compartir
          </button>
        </div>
      </div>
    </section>
  );
}