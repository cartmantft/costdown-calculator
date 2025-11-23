export interface AdditionalLot {
  price: number | null;
  quantity: number | null;
}

export interface DcaInput {
  symbol: string;
  currentAvgPrice: number | null;
  currentQuantity: number | null;
  additionalLots: AdditionalLot[];
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
  input: DcaInput;
  result: DcaResult;
  createdAt: string;
}
