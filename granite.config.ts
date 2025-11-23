import { defineConfig } from '@apps-in-toss/web-framework/config';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const devHost = env.DEV_SERVER_HOST || env.VITE_DEV_HOST || '0.0.0.0';
const devPort = parseNumber(env.DEV_SERVER_PORT || env.VITE_DEV_PORT || env.PORT, 5173);

export default defineConfig({
  appName: 'costdown-calculator',
  brand: {
    displayName: '코스트다운 계산기',
    primaryColor: '#3182F6',
    icon: '',
    bridgeColorMode: 'basic',
  },
  web: {
    // Override host/port via .env so they stay local.
    host: devHost,
    port: devPort,
    commands: {
      dev: `vite --host ${devHost} --port ${devPort} --strictPort`,
      build: 'vite build',
    },
  },
  permissions: [],
  outdir: 'dist',
});
