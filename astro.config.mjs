// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // En Astro 5+, NO uses 'hybrid'. Usa 'server' para que el formulario funcione.
  output: 'server', 
  adapter: cloudflare(),
  integrations: [react()],
});
