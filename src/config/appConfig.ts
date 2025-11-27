import type { CurrencyCode } from '../features/dca/types';

const DEFAULT_HISTORY_LIMIT = 10;
const DEFAULT_CURRENCY_CODE: CurrencyCode = 'KRW';
const DEFAULT_KRW_SYMBOL = '원';
const DEFAULT_USD_SYMBOL = '$';

const fromEnv = (value: string | undefined, fallback: string): string => {
  const trimmed = value?.trim();
  return trimmed || fallback;
};

const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseCurrencyCode = (value: string | undefined): CurrencyCode => {
  if (value === 'USD') return 'USD';
  return 'KRW';
};

export const currencyMap: Record<CurrencyCode, { code: CurrencyCode; symbol: string }> = {
  KRW: {
    code: 'KRW',
    symbol: fromEnv(import.meta.env.VITE_APP_CURRENCY_SYMBOL, DEFAULT_KRW_SYMBOL),
  },
  USD: {
    code: 'USD',
    symbol: DEFAULT_USD_SYMBOL,
  },
};

const defaultCurrencyCode = parseCurrencyCode(import.meta.env.VITE_APP_CURRENCY);

export const appConfig = {
  currencyCode: defaultCurrencyCode,
  currencySymbol: currencyMap[defaultCurrencyCode].symbol,
  currencyMap,
  historyLimit: parseNumber(import.meta.env.VITE_DCA_HISTORY_LIMIT, DEFAULT_HISTORY_LIMIT),
};
