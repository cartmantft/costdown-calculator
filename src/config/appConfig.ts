const DEFAULT_HISTORY_LIMIT = 10;
const DEFAULT_CURRENCY_CODE = 'KRW';
const DEFAULT_CURRENCY_SYMBOL = '원';

const fromEnv = (value: string | undefined, fallback: string): string => {
  const trimmed = value?.trim();
  return trimmed || fallback;
};

const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const appConfig = {
  currencyCode: fromEnv(import.meta.env.VITE_APP_CURRENCY, DEFAULT_CURRENCY_CODE),
  currencySymbol: fromEnv(import.meta.env.VITE_APP_CURRENCY_SYMBOL, DEFAULT_CURRENCY_SYMBOL),
  historyLimit: parseNumber(import.meta.env.VITE_DCA_HISTORY_LIMIT, DEFAULT_HISTORY_LIMIT),
};
