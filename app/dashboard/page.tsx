"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("perfil");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    // Cargar datos actuales del DJ
    fetch("/api/dj/flor-moon")
      .then((res) => res.json())
      .then((data) => {
        setValue("name", data.name);
        setValue("tagline", data.tagline);
        setValue("bio", data.bio);
        setValue("location", data.location);
        setValue("genres", data.genres);
        setValue("highlights", data.highlights);
        setValue("labels", data.labels);
        setValue("email", data.email);
        if (data.hero) {
          setValue("hero_artistName", data.hero.artistName);
          setValue("hero_tagline", data.hero.tagline);
          setValue("hero_position", data.hero.position);
          setValue("hero_logoSize", data.hero.logoSize);
          setValue("hero_overlayOpacity", data.hero.overlayOpacity);
          setValue("hero_showButtons", data.hero.showButtons === 1);
        }
      });
  }, [setValue]);

  const onSubmitPerfil = async (data: any) => {
    setLoading(true);
    const res = await fetch("/api/dj/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: "flor-moon",
        section: "perfil",
        data: {
          name: data.name,
          tagline: data.tagline,
          bio: data.bio,
          location: data.location,
          genres: data.genres,
          highlights: data.highlights,
          labels: data.labels,
          email: data.email,
        },
      }),
    });
    if (res.ok) {
      setMessage("Perfil actualizado");
      setTimeout(() => setMessage(""), 3000);
    }
    setLoading(false);
  };

  const onSubmitHero = async (data: any) => {
    setLoading(true);
    const res = await fetch("/api/dj/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: "flor-moon",
        section: "hero",
        data: {
          artistName: data.hero_artistName,
          tagline: data.hero_tagline,
          position: data.hero_position,
          logoSize: parseInt(data.hero_logoSize),
          overlayOpacity: parseFloat(data.hero_overlayOpacity),
          showButtons: data.hero_showButtons,
        },
      }),
    });
    if (res.ok) {
      setMessage("Hero actualizado");
      setTimeout(() => setMessage(""), 3000);
    }
    setLoading(false);
  };

  const tabs = [
    { id: "perfil", name: "Perfil" },
    { id: "hero", name: "Hero" },
    { id: "eventos", name: "Eventos" },
    { id: "musica", name: "Música" },
    { id: "galeria", name: "Galería" },
    { id: "rider", name: "Rider" },
    { id: "contacto", name: "Contacto" },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <aside className="w-64 bg-black/90 border-r border-white/10 min-h-screen p-4">
          <h1 className="text-xl font-bold text-white mb-8">PressKit DJ</h1>
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  activeTab === tab.id
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {tabs.find((t) => t.id === activeTab)?.name}
            </h2>
            
            {message && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
                {message}
              </div>
            )}

            {activeTab === "perfil" && (
              <form onSubmit={handleSubmit(onSubmitPerfil)} className="space-y-4 bg-white/5 rounded-lg p-6 border border-white/10">
                <div>
                  <label className="block text-white/70 mb-1">Nombre artístico</label>
                  <input {...register("name")} className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Tagline</label>
                  <input {...register("tagline")} className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Bio</label>
                  <textarea {...register("bio")} rows={4} className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Ubicación</label>
                  <input {...register("location")} className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Géneros</label>
                  <input {...register("genres")} className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Eventos destacados</label>
                  <input {...register("highlights")} className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Labels</label>
                  <input {...register("labels")} className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Email</label>
                  <input {...register("email")} type="email" className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" />
                </div>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-white/90">
                  {loading ? "Guardando..." : "Guardar cambios"}
                </button>
              </form>
            )}

            {activeTab === "hero" && (
              <form onSubmit={handleSubmit(onSubmitHero)} className="space-y-4 bg-white/5 rounded-lg p-6 border border-white/10">
                <div>
                  <label className="block text-white/70 mb-1">Nombre (Hero)</label>
                  <input {...register("hero_artistName")} className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Tagline (Hero)</label>
                  <input {...register("hero_tagline")} className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Posición</label>
                  <select {...register("hero_position")} className="w-full p-2 bg-white/10 border border-white/20 rounded text-white">
                    <option value="center">Centro</option>
                    <option value="top-center">Arriba centro</option>
                    <option value="bottom-center">Abajo centro</option>
                    <option value="left-center">Izquierda centro</option>
                    <option value="right-center">Derecha centro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Tamaño del logo (px)</label>
                  <input {...register("hero_logoSize")} type="number" className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Opacidad overlay (0-1)</label>
                  <input {...register("hero_overlayOpacity")} type="number" step="0.1" className="w-full p-2 bg-white/10 border border-white/20 rounded text-white" />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white/70">
                    <input {...register("hero_showButtons")} type="checkbox" />
                    Mostrar botones (Escuchar/Contactar)
                  </label>
                </div>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-white/90">
                  {loading ? "Guardando..." : "Guardar cambios"}
                </button>
              </form>
            )}

            {activeTab !== "perfil" && activeTab !== "hero" && (
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 text-center text-white/60">
                Panel en desarrollo para {activeTab}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}