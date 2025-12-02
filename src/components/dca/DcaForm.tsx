import { FormEvent, ChangeEvent, useEffect, useState } from 'react';
import { ListHeader, SegmentedControl, TextButton, TextField } from '@toss/tds-mobile';
import { currencyMap } from '../../config/appConfig';
import { formatCurrencyNumber, formatNumberInput, parseNumberInput } from '../../lib/numberFormat';
import type { DcaInput } from '../../features/dca/types';
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
  const [avgPriceInput, setAvgPriceInput] = useState(formatNumberInput(input.currentAvgPrice));
  const [lotInputs, setLotInputs] = useState(
    input.additionalLots.map((lot) => ({
      price: formatNumberInput(lot.price),
      quantity: formatNumberInput(lot.quantity),
    }))
  );
  const handleCurrencyChange = (value: string) => {
    const next = value === 'USD' ? 'USD' : 'KRW';
    if (next === currency) return;
    onChange({ currency: next });
  };

  const avgPriceInputId = 'avg-price-input';

  useEffect(() => {
    const next = formatNumberInput(input.currentAvgPrice);
    if (next === avgPriceInput) return;
    setAvgPriceInput(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.currentAvgPrice]);

  useEffect(() => {
    const next = input.additionalLots.map((lot) => ({
      price: formatNumberInput(lot.price),
      quantity: formatNumberInput(lot.quantity),
    }));
    const sameLength = next.length === lotInputs.length;
    const sameValues =
      sameLength &&
      next.every(
        (entry, idx) =>
          entry.price === lotInputs[idx]?.price && entry.quantity === lotInputs[idx]?.quantity
      );
    if (sameValues) return;
    setLotInputs(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.additionalLots]);

  const exceedsDecimals = (raw: string, max: number) => {
    const match = raw.replace(/,/g, '').match(/^-?\d*(?:\.(\d*))?$/);
    if (!match) return true;
    const decimals = match[1] ?? '';
    return decimals.length > max;
  };

  const handleAvgPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    if (exceedsDecimals(raw, 2)) return;
    setAvgPriceInput(raw);
    const sanitized = raw.replace(/,/g, '').trim();
    if (sanitized === '') {
      onChange({ currentAvgPrice: null });
      return;
    }
    const parsed = Number(sanitized);
    if (!Number.isFinite(parsed)) return;
    onChange({ currentAvgPrice: parsed });
  };

  const handleLotInputChange =
    (index: number, key: 'price' | 'quantity') => (event: ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value;
      if (key === 'price' && exceedsDecimals(raw, 2)) return;
      setLotInputs((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], [key]: raw };
        return next;
      });

      const sanitized = raw.replace(/,/g, '').trim();
      if (sanitized === '') {
        onChangeLot(index, { [key]: null });
        return;
      }
      const parsed = Number(sanitized);
      if (!Number.isFinite(parsed)) return;
      onChangeLot(index, { [key]: parsed });
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
        <div className="field-group-item">
          <div className="field-label-row">
            <label className="field-inline-label" htmlFor={avgPriceInputId}>
              현재 평균단가
            </label>
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
          id={avgPriceInputId}
          type="text"
          inputMode="decimal"
          value={avgPriceInput}
          suffix={currencySymbol}
          onChange={handleAvgPriceChange}
        />
      </div>
      <TextField
        variant="box"
        label="보유 수량"
        type="text"
        inputMode="decimal"
        value={formatNumberInput(input.currentQuantity)}
        onChange={(event) => onChange({ currentQuantity: parseNumberInput(event.target.value) })}
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
              value={lotInputs[index]?.price ?? formatNumberInput(lot.price)}
              suffix={currencySymbol}
              onChange={handleLotInputChange(index, 'price')}
            />
            <TextField
              variant="box"
              label="추가 수량"
              type="text"
              inputMode="decimal"
              value={lotInputs[index]?.quantity ?? formatNumberInput(lot.quantity)}
              onChange={handleLotInputChange(index, 'quantity')}
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
