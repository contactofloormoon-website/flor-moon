"use client";

import { useEffect, useState } from "react";

interface Event {
  id: string;
  date: string;
  city: string;
  venue: string;
  promoter: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = window.location.pathname === "/" ? "default" : window.location.pathname.slice(1);
    
    fetch(`/api/dj/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.events && data.events.length > 0) {
          setEvents(data.events);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading events:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (events.length === 0) return null;

  // Obtener meses únicos con eventos
  const months = Array.from(new Set(events.map((e) => {
    const d = new Date(e.date);
    return `${d.getFullYear()}-${d.getMonth()}`;
  }))).sort();

  const currentMonthKey = months[currentMonth];
  const currentEvents = events.filter((e) => {
    const d = new Date(e.date);
    return `${d.getFullYear()}-${d.getMonth()}` === currentMonthKey;
  });

  const nextEvent = events[0];

  const monthNames = (dateStr: string) => {
    const [year, month] = dateStr.split("-");
    const d = new Date(parseInt(year), parseInt(month));
    return d.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  };

  return (
    <section id="events" className="py-20 px-4 md:px-8 bg-black/90">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Próximos eventos
        </h2>

        {nextEvent && (
          <div className="mb-12 p-6 border border-white/20 rounded-lg bg-white/5">
            <div className="text-sm text-white/60 mb-2">PRÓXIMO EVENTO</div>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-2xl font-bold text-white">
                {new Date(nextEvent.date).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                })}
              </span>
              <span className="text-white/80">•</span>
              <span className="text-white text-lg">{nextEvent.city}</span>
              <span className="text-white/80">•</span>
              <span className="text-white/80">{nextEvent.venue}</span>
              <span className="text-white/80">•</span>
              <span className="text-white/60">{nextEvent.promoter}</span>
            </div>
          </div>
        )}

        {months.length > 0 && (
          <>
            <div className="flex items-center justify-between max-w-md mx-auto mb-8">
              <button
                onClick={() => setCurrentMonth((prev) => Math.max(0, prev - 1))}
                className="text-white text-2xl hover:text-white/70 transition"
              >
                ←
              </button>
              <span className="text-white text-xl font-semibold">
                {monthNames(currentMonthKey)}
              </span>
              <button
                onClick={() => setCurrentMonth((prev) => Math.min(months.length - 1, prev + 1))}
                className="text-white text-2xl hover:text-white/70 transition"
              >
                →
              </button>
            </div>

            <div className="space-y-3">
              {currentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-wrap gap-4 items-center justify-between p-4 border-b border-white/10 hover:bg-white/5 transition"
                >
                  <div className="flex gap-4 items-center">
                    <span className="text-white font-mono">
                      {new Date(event.date).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="text-white/80">{event.city}</span>
                    <span className="text-white/60">{event.venue}</span>
                  </div>
                  <span className="text-white/40 text-sm">{event.promoter}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}