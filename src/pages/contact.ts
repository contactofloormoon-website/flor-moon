export const prerender = true;

export async function POST({ request }: { request: Request }) {
  return new Response(JSON.stringify({ 
    success: false, 
    error: 'Formulario deshabilitado temporalmente' 
  }), { status:503 });
}