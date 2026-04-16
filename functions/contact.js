export async function onRequestPost({ request, env }) {
  try {
    const { name, email, phone, subject, message } = await request.json();
    
    const resendApiKey = env.RESEND_API_KEY;
    
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
        'Authorization': `Bearer ${resendApiKey}`,
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
      return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}