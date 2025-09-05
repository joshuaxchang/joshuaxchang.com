// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "static",
  // For Cloudflare Pages, a specific adapter is not needed for 'static' output.
  // The 'sharp' image service is used by default for static builds.
});
