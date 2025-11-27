export type CurrencyCode = 'KRW' | 'USD';
export const SUPPORTED_CURRENCIES: CurrencyCode[] = ['KRW', 'USD'];

export interface AdditionalLot {
  price: number | null;
  quantity: number | null;
}

export interface DcaInput {
  symbol: string;
  currentAvgPrice: number | null;
  currentQuantity: number | null;
  additionalLots: AdditionalLot[];
  currency: CurrencyCode;
}

export interface DcaResult {
  finalAvgPrice: number;
  finalQuantity: number;
  currentTotalCost: number;
  additionalTotalCost: number;
  additionalQuantity: number;
  additionalAvgPrice: number;
  additionalReturn: number; // (additionalAvgPrice - finalAvgPrice) / finalAvgPrice
}

export interface DcaHistoryItem {
  id: string;
  currency: CurrencyCode;
  input: DcaInput;
  result: DcaResult;
  createdAt: string;
}
