export const runtime = 'edge';

import React from 'react';

export default function PresskitDJ() {
  // AQUÍ ES DONDE FLOR O CUALQUIER DJ CAMBIA SUS DATOS
  const djData = {
    name: "NOMBRE DEL DJ",
    subTitle: "Techno / House Producer",
    bio: "Escribe aquí una biografía impactante. Trayectoria, clubes donde tocó y estilo musical único.",
    instagram: "https://instagram.com",
    soundcloud: "https://soundcloud.com",
    spotify: "https://spotify.com",
    email: "contacto@dj.com",
    imageUrl: "https://unsplash.com" // Foto de prueba
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Foto de Perfil */}
        <img 
          src={djData.imageUrl} 
          alt={djData.name} 
          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #bc13fe', marginBottom: '20px' }}
        />

        {/* Nombre y Estilo */}
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', letterSpacing: '2px' }}>{djData.name}</h1>
        <p style={{ color: '#bc13fe', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '30px' }}>{djData.subTitle}</p>

        {/* Biografía */}
        <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '15px', marginBottom: '30px', lineHeight: '1.6' }}>
          <p>{djData.bio}</p>
        </div>

        {/* Botones de Redes Sociales */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <a href={djData.instagram} target="_blank" style={buttonStyle}>INSTAGRAM</a>
          <a href={djData.soundcloud} target="_blank" style={buttonStyle}>SOUNDCLOUD</a>
          <a href={djData.spotify} target="_blank" style={buttonStyle}>SPOTIFY</a>
          <a href={`mailto:${djData.email}`} style={{ ...buttonStyle, backgroundColor: '#ffffff', color: '#000000' }}>BOOKING DIRECTO</a>
        </div>

        <footer style={{ marginTop: '50px', fontSize: '0.8rem', opacity: '0.5' }}>
          © 2026 Rosario Groove Records - Digital Presskit Service
        </footer>
      </div>
    </div>
  );
}

// Estilo para los botones
const buttonStyle = {
  display: 'block',
  padding: '15px',
  backgroundColor: 'transparent',
  color: '#ffffff',
  textDecoration: 'none',
  borderRadius: '8px',
  border: '1px solid #333',
  fontWeight: 'bold',
  transition: '0.3s',
  letterSpacing: '1px'
};
