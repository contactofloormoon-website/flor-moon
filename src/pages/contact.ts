export const prerender = false;

export async function POST({ request, locals }: { request: Request; locals: any }) {
  try {
    const data = await request.json();
    const { name, email, phone, subject, message } = data;
    
    const RESEND_API_KEY = 
      locals?.runtime?.env?.RESEND_API_KEY || 
      (locals as any)?.env?.RESEND_API_KEY || 
      import.meta.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      console.error("Error: RESEND_API_KEY no encontrada");
      return new Response(JSON.stringify({ success: false, error: 'Missing API Key' }), { status: 500 });
    }

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
      const errorDetail = await response.text();
      console.error("Error de Resend:", errorDetail);
      return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}