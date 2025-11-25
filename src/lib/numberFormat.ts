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
