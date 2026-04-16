// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Mantiene el sitio en modo servidor
  adapter: cloudflare({
    mode: 'directory', // ESTA LÍNEA es la que arregla los errores 404 en subpáginas
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [react()],
});
