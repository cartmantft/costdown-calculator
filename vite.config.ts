import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const parseNumber = (value: string | undefined, fallback: number): number => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const host = env.DEV_SERVER_HOST || env.VITE_DEV_HOST || '0.0.0.0';
  const port = parseNumber(env.DEV_SERVER_PORT || env.VITE_DEV_PORT || env.PORT, 5173);

  return {
    plugins: [react()],
    server: {
      host,
      port,
    },
    build: {
      outDir: 'dist',
    },
  };
});
