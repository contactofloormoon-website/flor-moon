"use client";

import { useEffect, useState } from "react";

interface ContactConfig {
  email: string | null;
  instagram: string | null;
  soundcloud: string | null;
  spotify: string | null;
  showBookingButton: boolean;
}

export default function Contact() {
  const [config, setConfig] = useState<ContactConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    eventDate: "",
  });

  useEffect(() => {
    const slug = window.location.pathname === "/" ? "default" : window.location.pathname.slice(1);
    
    fetch(`/api/dj/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.contact) {
          setConfig(data.contact);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading contact:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (!config || (!config.email && !config.instagram && !config.soundcloud && !config.spotify)) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensaje enviado. Te contactaremos pronto.");
    setFormData({ name: "", email: "", message: "", eventDate: "" });
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8 bg-black/90">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Contacto
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/60"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/60"
                required
              />
            </div>
            <div>
              <input
                type="date"
                placeholder="Fecha del evento (opcional)"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/60"
              />
            </div>
            <div>
              <textarea
                placeholder="Mensaje"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/60"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition"
            >
              Enviar mensaje
            </button>
          </form>

          <div className="space-y-6">
            {config.email && (
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Email directo</h3>
                <a href={`mailto:${config.email}`} className="text-white/70 hover:text-white transition">
                  {config.email}
                </a>
              </div>
            )}
            {(config.instagram || config.soundcloud || config.spotify) && (
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Redes</h3>
                <div className="flex gap-4">
                  {config.instagram && (
                    <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition">
                      Instagram
                    </a>
                  )}
                  {config.soundcloud && (
                    <a href={config.soundcloud} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition">
                      SoundCloud
                    </a>
                  )}
                  {config.spotify && (
                    <a href={config.spotify} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition">
                      Spotify
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}