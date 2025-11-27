export type CurrencyCode = 'KRW' | 'USD';

interface CurrencyOption {
  code: CurrencyCode;
  label: string;
  symbol: string;
}

export const currencyOptions: CurrencyOption[] = [
  { code: 'KRW', label: 'KRW', symbol: '원' },
  { code: 'USD', label: 'USD', symbol: '$' },
];

export const getCurrencyMeta = (code: string | undefined | null): CurrencyOption => {
  const matched = currencyOptions.find((option) => option.code === code);
  return matched ?? currencyOptions[0];
};
