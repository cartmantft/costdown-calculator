import type { DcaInput, DcaResult } from './types';

const isValidNumber = (value: number | null): value is number =>
  value !== null && Number.isFinite(value) && value >= 0;

export const calculateDca = (input: DcaInput): DcaResult | null => {
  const { currentAvgPrice, currentQuantity, marketPrice, targetAvgPrice } = input;

  if (
    !isValidNumber(currentAvgPrice) ||
    !isValidNumber(currentQuantity) ||
    !isValidNumber(marketPrice) ||
    !isValidNumber(targetAvgPrice)
  ) {
    return null;
  }

  const currentTotalCost = currentAvgPrice * currentQuantity;
  const denominator = targetAvgPrice - marketPrice;

  if (denominator === 0) {
    return null;
  }

  const numerator = currentTotalCost - targetAvgPrice * currentQuantity;
  const additionalQuantity = numerator / denominator;

  if (!Number.isFinite(additionalQuantity) || additionalQuantity <= 0 || denominator <= 0) {
    return null;
  }

  const additionalCost = additionalQuantity * marketPrice;
  const resultingAvgPrice =
    (currentTotalCost + additionalCost) / (currentQuantity + additionalQuantity);

  return {
    additionalQuantity,
    additionalCost,
    resultingAvgPrice,
  };
};
