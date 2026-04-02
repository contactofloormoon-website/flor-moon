export const runtime = 'edge';

import React from 'react';

export default function Page() {
  // CONFIGURACIÓN DINÁMICA (Para que cobres por cambiar estos datos)
  const dj = {
    name: "FLOR MOON",
    tagline: "TECHNO & HYPNOTIC PULSE",
    bio: "Explorando las profundidades del sonido industrial y atmósferas hipnóticas. Con base en Rosario, Flor ha marcado su pulso en la escena local.",
    accentColor: "#bc13fe",
    links: [
      { name: 'SPOTIFY', url: '#' },
      { name: 'SOUNDCLOUD', url: '#' },
      { name: 'INSTAGRAM', url: '#' }
    ],
    rider: [
      { item: 'Pioneer CDJ-3000', qty: '2x' },
      { item: 'Xone:96 Mixer', qty: '1x' }
    ]
  };

  return (
    <main style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
      
      {/* SECCIÓN 1: HERO */}
      <section style={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(rgba(0,0,0,0.5), #050505), url("https://unsplash.com") center/cover' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', margin: 0 }}>{dj.name}</h1>
        <p style={{ color: dj.accentColor, fontWeight: 'bold', letterSpacing: '3px' }}>{dj.tagline}</p>
        <button style={{ marginTop: '30px', padding: '12px 30px', backgroundColor: dj.accentColor, color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>BOOKING</button>
      </section>

      {/* SECCIÓN 2: INFO & LINKS */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '50px 20px' }}>
        <h2 style={{ fontSize: '1.2rem', borderBottom: `2px solid ${dj.accentColor}`, display: 'inline-block', marginBottom: '20px' }}>BIO</h2>
        <p style={{ lineHeight: '1.6', opacity: 0.8 }}>{dj.bio}</p>

        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {dj.links.map((link) => (
            <a key={link.name} href={link.url} style={{ padding: '15px', border: '1px solid #222', borderRadius: '8px', color: '#fff', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', transition: '0.3s' }}>
              {link.name}
            </a>
          ))}
        </div>

        {/* SECCIÓN 3: RIDER */}
        <div style={{ marginTop: '60px', backgroundColor: '#111', padding: '30px', borderRadius: '15px' }}>
          <h3 style={{ fontSize: '1rem', textAlign: 'center', marginBottom: '20px', opacity: 0.5 }}>TECHNICAL RIDER</h3>
          {dj.rider.map((r) => (
            <div key={r.item} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #222' }}>
              <span>{r.item}</span>
              <span style={{ fontWeight: 'bold' }}>{r.qty}</span>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '50px', opacity: 0.2, fontSize: '0.7rem' }}>
        POWERED BY ROSARIO GROOVE RECORDS
      </footer>
    </main>
  );
}
