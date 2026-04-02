import "./globals.css";

export const metadata = {
  title: "DJ Presskit | FLOR MOON",
  description: "Professional Digital Presskit for DJs & Artists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Esta línea busca tu nuevo icono en la carpeta public */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* Si prefieres usar un .ico en el futuro, solo cambias .png por .ico arriba */}
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#050505' }}>
        {children}
      </body>
    </html>
  );
}
