import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          ourStory: path.resolve(__dirname, 'our-story.html'),
          whatsComingUp: path.resolve(__dirname, 'whats-coming-up.html'),
          sensoryAndSong: path.resolve(__dirname, 'sensory-and-song.html'),
          partiesForLittleStarres: path.resolve(__dirname, 'parties-for-little-starres.html'),
          ourCharacters: path.resolve(__dirname, 'our-characters.html'),
          packagesAndPrices: path.resolve(__dirname, 'packages-and-prices.html'),
          privacyPolicy: path.resolve(__dirname, 'privacy-policy.html'),
          cookiePolicy: path.resolve(__dirname, 'cookie-policy.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
