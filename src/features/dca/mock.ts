import { calculateDca } from './calc';
import type { DcaHistoryItem, DcaInput } from './types';

const MOCK_INPUT: DcaInput = {
  symbol: '삼성전자',
  currentAvgPrice: 100000,
  currentQuantity: 100,
  additionalLots: [
    {
      price: 95000,
      quantity: 100,
    },
  ],
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
