import "./globals.css";

export const metadata = {
  title: "DJ Presskit | Digital EPK",
  description: "Professional Presskit for Artists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Esto evita que el navegador busque el icono viejo de Vercel */}
        <link rel="icon" href="data:," />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
