import type { CurrencyCode } from '../features/dca/types';

const isFiniteNumber = (value: number | null | undefined): value is number =>
  value !== null && value !== undefined && Number.isFinite(value);

export const formatNumber = (
  value: number | null | undefined,
  options: Intl.NumberFormatOptions = { maximumFractionDigits: 2 }
) => {
  if (!isFiniteNumber(value)) return '-';
  return value.toLocaleString(undefined, options);
};

export const formatPercent = (
  value: number | null | undefined,
  options: Intl.NumberFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
) => {
  if (!isFiniteNumber(value)) return '-';
  const formatted = (value * 100).toLocaleString(undefined, options);
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${formatted}%`;
};

export const parseNumberInput = (raw: string) => {
  const sanitized = raw.replace(/,/g, '').trim();
  if (sanitized === '') return null;
  const parsed = Number(sanitized);
  return Number.isFinite(parsed) ? parsed : null;
};

export const formatNumberInput = (value: number | null | undefined) => {
  if (value === null || value === undefined) return '';
  return Number.isFinite(value) ? value.toLocaleString() : '';
};

export const roundHalfUp = (value: number, decimals: number = 2) => {
  if (!Number.isFinite(value)) return value;
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

export const formatCurrencyNumber = (
  value: number | null | undefined,
  currency: CurrencyCode,
  options?: Intl.NumberFormatOptions
) => {
  const currencyOptions =
    currency === 'USD'
      ? { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      : { maximumFractionDigits: 2 };
  return formatNumber(value, { ...currencyOptions, ...options });
};
