import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'costdown-calculator',
  brand: {
    displayName: '코스트다운 계산기',
    primaryColor: '#3182F6',
    icon: '',
    bridgeColorMode: 'basic',
  },
  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'vite',
      build: 'vite build',
    },
  },
  permissions: [],
  outdir: 'dist',
});
