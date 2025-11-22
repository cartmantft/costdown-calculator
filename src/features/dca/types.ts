export interface DcaInput {
  currentAvgPrice: number | null;
  currentQuantity: number | null;
  marketPrice: number | null;
  targetAvgPrice: number | null;
}

export interface DcaResult {
  additionalQuantity: number;
  additionalCost: number;
  resultingAvgPrice: number;
}

export interface DcaHistoryItem {
  id: string;
  input: DcaInput;
  result: DcaResult;
  createdAt: string;
}
