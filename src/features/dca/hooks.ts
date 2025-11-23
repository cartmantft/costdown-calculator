import { useMemo, useState } from 'react';
import { calculateDca } from './calc';
import { addHistory, loadHistory, removeHistory } from './history';
import { buildMockHistory } from './mock';
import type { DcaHistoryItem, DcaInput } from './types';

const EMPTY_LOT = { price: null, quantity: null };

const DEFAULT_INPUT: DcaInput = {
  symbol: '',
  currentAvgPrice: null,
  currentQuantity: null,
  additionalLots: [EMPTY_LOT],
};

export const useDcaCalculator = () => {
  const [input, setInput] = useState<DcaInput>(DEFAULT_INPUT);
  const [history, setHistory] = useState<DcaHistoryItem[]>(() => {
    const saved = loadHistory();
    return saved.length ? saved : buildMockHistory();
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const result = useMemo(() => calculateDca(input), [input]);

  const updateInput = (patch: Partial<DcaInput>) => {
    setInput((prev) => ({ ...prev, ...patch }));
  };

  const updateLot = (index: number, patch: Partial<DcaInput['additionalLots'][number]>) => {
    setInput((prev) => ({
      ...prev,
      additionalLots: prev.additionalLots.map((lot, i) => (i === index ? { ...lot, ...patch } : lot)),
    }));
  };

  const addLot = () => {
    setInput((prev) => ({
      ...prev,
      additionalLots: [...prev.additionalLots, { ...EMPTY_LOT }],
    }));
  };

  const removeLot = (index: number) => {
    setInput((prev) => {
      const nextLots = prev.additionalLots.filter((_, i) => i !== index);
      return {
        ...prev,
        additionalLots: nextLots.length ? nextLots : [{ ...EMPTY_LOT }],
      };
    });
  };

  const reset = () => {
    setSelectedId(null);
    setInput(DEFAULT_INPUT);
  };

  const openFromHistory = (id: string) => {
    const found = history.find((item) => item.id === id);
    if (!found) return;
    setSelectedId(id);
    setInput(found.input);
  };

  const save = () => {
    const trimmedInput = { ...input, symbol: input.symbol.trim() };
    const nextResult = calculateDca(trimmedInput);
    if (!nextResult) return { ok: false as const };
    const nextHistory = addHistory(trimmedInput, nextResult);
    setHistory(nextHistory);
    setSelectedId(nextHistory[0].id);
    return { ok: true as const };
  };

  const deleteEntry = (id: string) => {
    const nextHistory = removeHistory(id);
    setHistory(nextHistory);
    if (selectedId === id) {
      reset();
    }
  };

  return {
    input,
    result,
    history,
    selectedId,
    updateInput,
    updateLot,
    addLot,
    removeLot,
    reset,
    openFromHistory,
    save,
    deleteEntry,
  };
};
