import { normalizeCurrencyInput, roundHalfUp } from '../../lib/numberFormat';
import type { AdditionalLot, CurrencyCode, DcaInput, DcaResult } from './types';

const isPositiveNumber = (value: number | null): value is number =>
  value !== null && Number.isFinite(value) && value > 0;

const sumLots = (lots: AdditionalLot[], currency: CurrencyCode) => {
  return lots.reduce(
    (acc, lot) => {
      const price = normalizeCurrencyInput(lot.price, currency);
      if (!isPositiveNumber(price) || !isPositiveNumber(lot.quantity)) return acc;
      const cost = price * lot.quantity;
      return {
        quantity: acc.quantity + lot.quantity,
        cost: acc.cost + cost,
      };
    },
    { quantity: 0, cost: 0 }
  );
};

export const calculateDca = (input: DcaInput): DcaResult | null => {
  const { currentAvgPrice, currentQuantity, additionalLots, currency } = input;
  const normalizedCurrentAvgPrice = normalizeCurrencyInput(currentAvgPrice, currency);

  if (!isPositiveNumber(normalizedCurrentAvgPrice) || !isPositiveNumber(currentQuantity)) {
    return null;
  }

  const currentTotalCost = normalizedCurrentAvgPrice * currentQuantity;
  const { cost: additionalTotalCost, quantity: additionalQuantity } = sumLots(additionalLots, currency);

  if (additionalQuantity <= 0 || additionalTotalCost <= 0) {
    return {
      finalAvgPrice: normalizedCurrentAvgPrice,
      finalQuantity: currentQuantity,
      currentTotalCost,
      additionalTotalCost: 0,
      additionalQuantity: 0,
      additionalAvgPrice: 0,
      additionalReturn: 0,
    };
  }

  const finalQuantity = currentQuantity + additionalQuantity;
  const finalAvgPrice = (currentTotalCost + additionalTotalCost) / finalQuantity;
  const additionalAvgPrice = additionalTotalCost / additionalQuantity;
  const additionalReturn = (additionalAvgPrice - finalAvgPrice) / finalAvgPrice;

  const rounded = currency === 'USD'
    ? {
        finalAvgPrice: roundHalfUp(finalAvgPrice, 2),
        finalQuantity,
        currentTotalCost: roundHalfUp(currentTotalCost, 2),
        additionalTotalCost: roundHalfUp(additionalTotalCost, 2),
        additionalQuantity,
        additionalAvgPrice: roundHalfUp(additionalAvgPrice, 2),
        additionalReturn,
      }
    : {
        finalAvgPrice,
        finalQuantity,
        currentTotalCost,
        additionalTotalCost,
        additionalQuantity,
        additionalAvgPrice,
        additionalReturn,
      };

  return rounded;
};
