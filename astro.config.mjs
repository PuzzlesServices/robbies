// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://robbies.com',
  redirects: {
    '/activities.htm': '/activities',
    '/morning-activities.htm': '/morning-activities',
    '/evening-activities.htm': '/evening-activities',
    '/tarpon.htm': '/tarpon',
    '/tarpon-feeding.htm': '/tarpon',
    '/jet-ski-adventures.htm': '/jet-ski-adventures',
    '/jet-ski.htm': '/jet-ski-adventures',
    '/snorkeling.htm': '/snorkeling',
    '/snorkeling-tours.htm': '/snorkeling',
    '/snuba-the-reef.htm': '/snuba',
    '/snuba.htm': '/snuba'
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});


