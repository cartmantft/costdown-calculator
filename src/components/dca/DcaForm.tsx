import { FormEvent, ChangeEvent } from 'react';
import { ListHeader, SegmentedControl, TextButton, TextField } from '@toss/tds-mobile';
import { currencyMap } from '../../config/appConfig';
import {
  formatCurrencyNumber,
  formatNumberInput,
  normalizeCurrencyInput,
  parseNumberInput,
} from '../../lib/numberFormat';
import type { CurrencyCode, DcaInput } from '../../features/dca/types';
import { SUPPORTED_CURRENCIES } from '../../features/dca/types';

interface DcaFormProps {
  input: DcaInput;
  onChange: (patch: Partial<DcaInput>) => void;
  onChangeLot: (index: number, patch: { price?: number | null; quantity?: number | null }) => void;
  onAddLot: () => void;
  onRemoveLot: (index: number) => void;
  onSave: () => void;
  canSave: boolean;
}

const shouldRoundForCurrency = (key: keyof DcaInput | 'price' | 'quantity') =>
  key === 'currentAvgPrice' || key === 'price';

const numberInput =
  (key: keyof DcaInput, onChange: DcaFormProps['onChange'], currency: CurrencyCode) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = parseNumberInput(event.target.value);
    const normalized = shouldRoundForCurrency(key) ? normalizeCurrencyInput(nextValue, currency) : nextValue;
    onChange({ [key]: normalized });
  };

const lotInput =
  (
    index: number,
    key: 'price' | 'quantity',
    onChange: DcaFormProps['onChangeLot'],
    currency: CurrencyCode
  ) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = parseNumberInput(event.target.value);
    const normalized = shouldRoundForCurrency(key) ? normalizeCurrencyInput(nextValue, currency) : nextValue;
    onChange(index, { [key]: normalized });
  };

const DcaForm = ({
  input,
  onChange,
  onChangeLot,
  onAddLot,
  onRemoveLot,
  onSave,
  canSave,
}: DcaFormProps) => {
  const currency = input.currency ?? 'KRW';
  const handleCurrencyChange = (value: string) => {
    const next = value === 'USD' ? 'USD' : 'KRW';
    if (next === currency) return;
    onChange({ currency: next });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!canSave) return;
    onSave();
  };

  const currentTotal =
    input.currentAvgPrice !== null && input.currentQuantity !== null
      ? input.currentAvgPrice * input.currentQuantity
      : null;
  const currencySymbol = currencyMap[currency]?.symbol ?? currency;

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <ListHeader
        className="section-tight"
        title={
          <ListHeader.TitleParagraph fontWeight="bold" typography="t4">
            현재 보유
          </ListHeader.TitleParagraph>
        }
        description={
          <ListHeader.DescriptionParagraph>
            현재 보유 중인 단가와 수량을 입력하세요.
          </ListHeader.DescriptionParagraph>
        }
        descriptionPosition="bottom"
      />

      <div className="field-group">
        <TextField
          variant="box"
          label="종목명"
          placeholder="종목명"
          value={input.symbol}
          onChange={(event) => onChange({ symbol: event.target.value })}
        />
        <div className="field-label-row">
          <span className="field-inline-label">현재 평균단가</span>
          <SegmentedControl
            size="small"
            value={currency}
            onChange={handleCurrencyChange}
          >
            {SUPPORTED_CURRENCIES.map((code) => (
              <SegmentedControl.Item key={code} value={code}>
                {currencyMap[code].code}
              </SegmentedControl.Item>
            ))}
          </SegmentedControl>
        </div>
        <TextField
          variant="box"
          label="현재 평균단가"
          type="text"
          inputMode="decimal"
          value={formatNumberInput(input.currentAvgPrice)}
          suffix={currencySymbol}
          onChange={numberInput('currentAvgPrice', onChange, currency)}
        />
        <TextField
          variant="box"
          label="보유 수량"
          type="text"
          inputMode="decimal"
          value={formatNumberInput(input.currentQuantity)}
          onChange={numberInput('currentQuantity', onChange, currency)}
        />
        <TextField
          variant="box"
          label="현재 보유 총액"
          value={`${formatCurrencyNumber(currentTotal, currency)} ${currencySymbol}`}
          readOnly
          disabled
        />
      </div>

      <ListHeader
        title={
          <ListHeader.TitleParagraph fontWeight="bold" typography="t4">
            추가 매수
          </ListHeader.TitleParagraph>
        }
        description={
          <ListHeader.DescriptionParagraph>
            행을 추가해 여러 번에 나눠 입력할 수 있어요.
          </ListHeader.DescriptionParagraph>
        }
        descriptionPosition="bottom"
        right={
          <div className="lot-header-actions">
            <TextButton
              size="small"
              variant="arrow"
              arrowPlacement="inline"
              color="primary"
              className="text-primary"
              onClick={onAddLot}
              type="button"
            >
              행 추가
            </TextButton>
          </div>
        }
      />

      {input.additionalLots.map((lot, index) => {
        const lotTotal =
          lot.price !== null && lot.quantity !== null ? lot.price * lot.quantity : null;
        const lotNumber = input.additionalLots.length - index;
        return (
          <div className="lot-row" key={index}>
            <div className="lot-row-header">
              <ListHeader.DescriptionParagraph>{`추가 입력 ${lotNumber}`}</ListHeader.DescriptionParagraph>
              <TextButton
                size="small"
                variant="arrow"
                arrowPlacement="inline"
                className="text-danger"
                color="danger"
                onClick={() => onRemoveLot(index)}
              >
                삭제
              </TextButton>
            </div>
            <TextField
              variant="box"
              label="추가 단가"
              type="text"
              inputMode="decimal"
              value={formatNumberInput(lot.price)}
              suffix={currencySymbol}
              onChange={lotInput(index, 'price', onChangeLot, currency)}
            />
            <TextField
              variant="box"
              label="추가 수량"
              type="text"
              inputMode="decimal"
              value={formatNumberInput(lot.quantity)}
              onChange={lotInput(index, 'quantity', onChangeLot, currency)}
            />
            <TextField
              variant="box"
              label="추가 총액"
              value={`${formatCurrencyNumber(lotTotal, currency)} ${currencySymbol}`}
              readOnly
              disabled
            />
          </div>
        );
      })}
    </form>
  );
};

export default DcaForm;
