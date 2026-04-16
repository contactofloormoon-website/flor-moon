import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // En Astro 6, 'static' es el valor correcto para sitios con algunas funciones de servidor
  output: 'static', 
  adapter: cloudflare(),
  integrations: [react()],
});
