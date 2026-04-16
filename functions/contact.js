export async function onRequest(context) {
  const { request } = context;
  
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { name, email, phone, subject, message } = await request.json();
    
    const RESEND_API_KEY = context.env.RESEND_API_KEY;
    
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
        subject: `[Flor Moon Web] ${subject || 'Nuevo mensaje'} de ${name}`,
        text: emailContent,
        reply_to: email
      })
    });

    if (response.ok) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}