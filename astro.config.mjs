import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// Keystatic CMS is only available in dev mode (requires server-side rendering).
// In production, the blog content is fully pre-rendered at build time.
const keystatiCIntegration =
  process.env.NODE_ENV !== 'production'
    ? (await import('@keystatic/astro')).default()
    : undefined;

export default defineConfig({
  output: 'static',
  site: 'https://groundcontrol.land',

  integrations: [react(), mdx(), keystatiCIntegration].filter(Boolean),

  vite: {
    plugins: [tailwindcss()],
  },
});
