// src/pages/contact.ts
export const prerender = false;

export async function POST({ request, locals }: { request: Request; locals: any }) {
  try {
    const { name, email, phone, subject, message } = await request.json();
    
    // CAMBIO IMPORTANTE: Así se accede en Cloudflare con Astro
    const RESEND_API_KEY = locals.runtime.env.RESEND_API_KEY;
    
    const emailContent = `
Nombre: ${name}
Email: ${email}
Teléfono: ${phone || 'No especificado'}
Asunto: ${subject || 'Sin asunto'}
Mensaje: ${message}
    `;
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'contacto.flormoon@gmail.com',
        subject: `[Flor Moon] ${subject || 'Nuevo mensaje'} de ${name}`,
        text: emailContent,
        reply_to: email
      })
    });
    
    if (response.ok) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      // Agregamos esto para ver el error en la consola de Cloudflare si falla
      const errorText = await response.text();
      console.error('Error de Resend:', errorText);
      return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
