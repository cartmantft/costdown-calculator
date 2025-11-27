import type { AdditionalLot, DcaInput, DcaResult } from './types';

const isPositiveNumber = (value: number | null): value is number =>
  value !== null && Number.isFinite(value) && value > 0;

const sumLots = (lots: AdditionalLot[]) => {
  return lots.reduce(
    (acc, lot) => {
      if (!isPositiveNumber(lot.price) || !isPositiveNumber(lot.quantity)) return acc;
      const cost = lot.price * lot.quantity;
      return {
        quantity: acc.quantity + lot.quantity,
        cost: acc.cost + cost,
      };
    },
    { quantity: 0, cost: 0 }
  );
};

export const calculateDca = (input: DcaInput): DcaResult | null => {
  const { currentAvgPrice, currentQuantity, additionalLots } = input;
  if (!isPositiveNumber(currentAvgPrice) || !isPositiveNumber(currentQuantity)) {
    return null;
  }

  const currentTotalCost = currentAvgPrice * currentQuantity;
  const { cost: additionalTotalCost, quantity: additionalQuantity } = sumLots(additionalLots);

  if (additionalQuantity <= 0 || additionalTotalCost <= 0) {
    return {
      finalAvgPrice: currentAvgPrice,
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

  return {
    finalAvgPrice,
    finalQuantity,
    currentTotalCost,
    additionalTotalCost,
    additionalQuantity,
    additionalAvgPrice,
    additionalReturn,
  };
};
