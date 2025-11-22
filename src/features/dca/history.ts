import { appConfig } from '../../config/appConfig';
import { readItem, writeItem } from '../../lib/localStorage';
import type { DcaHistoryItem, DcaInput, DcaResult } from './types';

const STORAGE_KEY = 'dca-history';
const HISTORY_LIMIT = appConfig.historyLimit ?? 10;

const parseHistory = (raw: string | null): DcaHistoryItem[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as DcaHistoryItem[];
    return Array.isArray(parsed) ? parsed : [];
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
