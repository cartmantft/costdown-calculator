import { useEffect, useMemo, useState } from 'react';
import { appConfig } from '../../config/appConfig';
import { calculateDca } from './calc';
import { addHistory, loadHistoryWithMeta, removeHistory, updateHistory } from './history';
import type { CurrencyCode, DcaHistoryItem, DcaInput } from './types';
import { readItem, storageKeys, writeItem } from '../../lib/localStorage';

const EMPTY_LOT = { price: 0, quantity: 0 };

const parseCurrency = (code: string | null): CurrencyCode => (code === 'USD' ? 'USD' : 'KRW');

const buildDefaultInput = (currency: CurrencyCode): DcaInput => ({
  currency,
  symbol: '',
  currentAvgPrice: null,
  currentQuantity: null,
  additionalLots: [EMPTY_LOT],
});

const getInitialCurrency = (): CurrencyCode => parseCurrency(readItem(storageKeys.lastCurrency));

export const useDcaCalculator = () => {
  const initialCurrency = getInitialCurrency() || appConfig.currencyCode;
  const [input, setInput] = useState<DcaInput>(buildDefaultInput(initialCurrency));
  const [history, setHistory] = useState<DcaHistoryItem[]>(() => {
    const { history: saved } = loadHistoryWithMeta();
    return saved;
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
      additionalLots: [{ ...EMPTY_LOT }, ...prev.additionalLots],
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
    setInput((prev) => buildDefaultInput(prev.currency));
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

    const nextHistory = selectedId
      ? updateHistory(selectedId, trimmedInput, nextResult)
      : addHistory(trimmedInput, nextResult);

    setHistory(nextHistory);
    setSelectedId(selectedId ?? nextHistory[0]?.id ?? null);
    return { ok: true as const };
  };

  const deleteEntry = (id: string) => {
    const nextHistory = removeHistory(id);
    setHistory(nextHistory);
    if (selectedId === id) {
      reset();
    }
  };

  const setCurrency = (currency: CurrencyCode, options?: { resetInput?: boolean }) => {
    setSelectedId(null);
    setInput((prev) =>
      options?.resetInput ? buildDefaultInput(currency) : { ...prev, currency }
    );
  };

  useEffect(() => {
    writeItem(storageKeys.lastCurrency, input.currency);
  }, [input.currency]);

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
    setCurrency,
  };
};
