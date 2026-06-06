import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

function normalizeBasePath(basePath: string | undefined) {
  const trimmedBasePath = (basePath ?? '').trim();

  if (!trimmedBasePath || trimmedBasePath === '/') {
    return '/';
  }

  const withLeadingSlash = trimmedBasePath.startsWith('/') ? trimmedBasePath : `/${trimmedBasePath}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = normalizeBasePath(env.VITE_BASE_PATH ?? process.env.VITE_BASE_PATH);
  const supabaseUrl = (env.VITE_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? '').trim().replace(/\/$/, '');

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: supabaseUrl
        ? {
            '/api/article-sync': {
              target: supabaseUrl,
              changeOrigin: true,
              rewrite: () => '/functions/v1/article-sync',
            },
          }
        : undefined,
    },
  };
});
