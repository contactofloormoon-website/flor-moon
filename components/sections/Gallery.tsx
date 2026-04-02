"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  url: string;
  alt: string | null;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = window.location.pathname === "/" ? "default" : window.location.pathname.slice(1);
    
    fetch(`/api/dj/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.gallery && data.gallery.length > 0) {
          setImages(data.gallery);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading gallery:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (images.length === 0) return null;

  const handleDownloadPressKit = () => {
    alert("Descargando Press Kit...");
  };

  return (
    <section id="gallery" className="py-20 px-4 md:px-8 bg-black/90">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
          Galería
        </h2>
        <p className="text-white/60 text-center mb-12">
          Fotos de sets, estudio y eventos
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={image.url}
                alt={image.alt || "Gallery image"}
                fill
                className="object-cover transition group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleDownloadPressKit}
            className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition inline-flex items-center gap-2"
          >
            📸 Download Press Photos
          </button>
          <p className="text-white/40 text-sm mt-3">
            ZIP con fotos + logos + bio
          </p>
        </div>
      </div>
    </section>
  );
}