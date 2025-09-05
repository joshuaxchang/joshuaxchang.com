// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  // This forces Astro to process images at build time instead of on-demand,
  // which fixes the timeout errors on Cloudflare.
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
