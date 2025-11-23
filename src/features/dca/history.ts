import { appConfig } from '../../config/appConfig';
import { readItem, writeItem } from '../../lib/localStorage';
import type { DcaHistoryItem, DcaInput, DcaResult } from './types';

const STORAGE_KEY = 'dca-history';
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

const parseHistory = (raw: string | null): DcaHistoryItem[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as DcaHistoryItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidHistoryItem);
  } catch {
    return [];
  }
};

export const loadHistory = (): DcaHistoryItem[] => {
  const raw = readItem(STORAGE_KEY);
  return parseHistory(raw);
};

export const persistHistory = (history: DcaHistoryItem[]): void => {
  writeItem(STORAGE_KEY, JSON.stringify(history));
};

const createEntry = (input: DcaInput, result: DcaResult): DcaHistoryItem => ({
  id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
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

export const removeHistory = (id: string): DcaHistoryItem[] => {
  const next = loadHistory().filter((item) => item.id !== id);
  persistHistory(next);
  return next;
};
