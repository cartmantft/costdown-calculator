import { appConfig } from '../../config/appConfig';
import { readItem, storageKeys, writeItem } from '../../lib/localStorage';
import type { CurrencyCode, DcaHistoryItem, DcaInput, DcaResult } from './types';

const HISTORY_STORAGE_KEY = storageKeys.history;
const LEGACY_HISTORY_KEY = 'dca-history';
const HISTORY_LIMIT = appConfig.historyLimit ?? 10;

const isValidNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

const isValidHistoryItem = (item: DcaHistoryItem): boolean => {
  if (!item?.result) return false;
  return (
    isValidNumber(item.result.finalAvgPrice) &&
    isValidNumber(item.result.finalQuantity) &&
    isValidNumber(item.result.additionalReturn)
  );
};

const normalizeCurrency = (item: DcaHistoryItem): DcaHistoryItem => {
  const inferred: CurrencyCode =
    item.currency === 'USD' || item.input?.currency === 'USD' ? 'USD' : 'KRW';
  return {
    ...item,
    currency: inferred,
    input: {
      ...item.input,
      currency: item.input?.currency === 'USD' ? 'USD' : inferred,
    },
  };
};

const parseHistory = (raw: string | null): DcaHistoryItem[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as DcaHistoryItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidHistoryItem).map(normalizeCurrency);
  } catch {
    return [];
  }
};

export const loadHistory = (): DcaHistoryItem[] => {
  const raw = readItem(HISTORY_STORAGE_KEY) ?? readItem(LEGACY_HISTORY_KEY);
  return parseHistory(raw);
};

export const persistHistory = (history: DcaHistoryItem[]): void => {
  writeItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
};

const createEntry = (input: DcaInput, result: DcaResult): DcaHistoryItem => ({
  id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  currency: input.currency,
  input,
  result,
  createdAt: new Date().toISOString(),
});

export const addHistory = (input: DcaInput, result: DcaResult | null): DcaHistoryItem[] => {
  if (!result) return loadHistory();
  const next = [createEntry(input, result), ...loadHistory()].slice(0, HISTORY_LIMIT);
  persistHistory(next);
  return next;
};

export const updateHistory = (id: string, input: DcaInput, result: DcaResult | null): DcaHistoryItem[] => {
  if (!result) return loadHistory();
  const history = loadHistory();
  const hasTarget = history.some((item) => item.id === id);

  if (!hasTarget) {
    const next = [
      { id, currency: input.currency, input, result, createdAt: new Date().toISOString() },
      ...history,
    ].slice(0, HISTORY_LIMIT);
    persistHistory(next);
    return next;
  }

  const next = history.map((item) =>
    item.id === id ? { ...item, currency: input.currency, input, result } : item
  );
  persistHistory(next);
  return next;
};

export const removeHistory = (id: string): DcaHistoryItem[] => {
  const next = loadHistory().filter((item) => item.id !== id);
  persistHistory(next);
  return next;
};
