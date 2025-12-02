import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from '@apps-in-toss/web-framework/config';

type EnvMap = Record<string, string | undefined>;

const stripQuotes = (value: string): string => {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  return value;
};

const parseEnvFile = (filePath: string): Record<string, string> => {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, 'utf-8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .reduce<Record<string, string>>((acc, line) => {
      const equalsIndex = line.indexOf('=');
      if (equalsIndex === -1) {
        return acc;
      }

      const key = line.slice(0, equalsIndex).trim();
      const value = stripQuotes(line.slice(equalsIndex + 1).trim());

      acc[key] = value;
      return acc;
    }, {});
};

const loadEnvironment = (mode: string, root: string): EnvMap => {
  // Mirror Vite's precedence: mode-specific locals first.
  const envFiles = [`.env.${mode}.local`, `.env.${mode}`, `.env.local`, '.env'];

  const env: EnvMap = { ...process.env };
  for (const file of envFiles) {
    Object.assign(env, parseEnvFile(path.join(root, file)));
  }

  return env;
};

const env = loadEnvironment(process.env.NODE_ENV ?? 'development', process.cwd());
const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const devHost = env.DEV_SERVER_HOST || env.VITE_DEV_HOST || '0.0.0.0';
const devPort = parseNumber(env.DEV_SERVER_PORT || env.VITE_DEV_PORT || env.PORT, 5173);
const brandIcon = env.VITE_BRAND_LOGO_URL?.trim() || 'https://github.com/cartmantft/costdown-calculator/blob/main/src/assets/logo.png?raw=true';

export default defineConfig({
  appName: 'costdown-calculator',
  brand: {
    displayName: '물타기 계산기',
    primaryColor: '#3182F6',
    icon: brandIcon,
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
