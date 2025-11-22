import { useEffect, useState } from 'react';
import { calculateDca } from './calc';
import { addHistory, loadHistory } from './history';
import { buildMockHistory } from './mock';
import type { DcaHistoryItem, DcaInput, DcaResult } from './types';

const DEFAULT_INPUT: DcaInput = {
  currentAvgPrice: 5000,
  currentQuantity: 10,
  marketPrice: 4800,
  targetAvgPrice: 4900,
};

export const useDcaCalculator = () => {
  const [input, setInput] = useState<DcaInput>(DEFAULT_INPUT);
  const [result, setResult] = useState<DcaResult | null>(calculateDca(DEFAULT_INPUT));
  const [history, setHistory] = useState<DcaHistoryItem[]>([]);

  useEffect(() => {
    const saved = loadHistory();
    setHistory(saved.length ? saved : buildMockHistory());
  }, []);

  useEffect(() => {
    setResult(calculateDca(input));
  }, [input]);

  const updateInput = (patch: Partial<DcaInput>) => {
    setInput((prev) => ({ ...prev, ...patch }));
  };

  const calculate = () => {
    const nextResult = calculateDca(input);
    setResult(nextResult);
    setHistory(addHistory(input, nextResult));
  };

  const reset = () => {
    setInput(DEFAULT_INPUT);
  };

  return {
    input,
    result,
    history,
    updateInput,
    calculate,
    reset,
  };
};
