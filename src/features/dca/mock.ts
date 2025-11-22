import { calculateDca } from './calc';
import type { DcaHistoryItem, DcaInput } from './types';

const MOCK_INPUT: DcaInput = {
  currentAvgPrice: 5000,
  currentQuantity: 10,
  marketPrice: 4500,
  targetAvgPrice: 4800,
};

export const buildMockHistory = (): DcaHistoryItem[] => {
  const base = calculateDca(MOCK_INPUT);
  if (!base) return [];
  const now = Date.now();

  const sample: DcaHistoryItem = {
    id: `mock-${now}`,
    input: MOCK_INPUT,
    result: base,
    createdAt: new Date(now).toISOString(),
  };

  return [sample];
};
