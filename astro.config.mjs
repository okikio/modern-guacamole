import { defineConfig } from 'astro/config';

import SOLID_JS from "@astrojs/solid-js";
import TAILWIND from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [SOLID_JS(), TAILWIND()]
});