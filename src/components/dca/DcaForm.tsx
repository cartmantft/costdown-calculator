import { FormEvent, ChangeEvent } from 'react';
import { appConfig } from '../../config/appConfig';
import type { DcaInput } from '../../features/dca/types';

interface DcaFormProps {
  input: DcaInput;
  onChange: (patch: Partial<DcaInput>) => void;
  onChangeLot: (index: number, patch: { price?: number | null; quantity?: number | null }) => void;
  onAddLot: () => void;
  onRemoveLot: (index: number) => void;
  onSave: () => void;
  onReset: () => void;
  canSave: boolean;
}

const toNumberOrNull = (raw: string) => (raw === '' ? null : Number(raw));

const numberInput =
  (key: keyof DcaInput, onChange: DcaFormProps['onChange']) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = toNumberOrNull(event.target.value);
    onChange({ [key]: nextValue });
  };

const lotInput =
  (
    index: number,
    key: 'price' | 'quantity',
    onChange: DcaFormProps['onChangeLot']
  ) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = toNumberOrNull(event.target.value);
    onChange(index, { [key]: nextValue });
  };

const formatNumber = (value: number | null | undefined) =>
  value !== null && value !== undefined && Number.isFinite(value)
    ? value.toLocaleString()
    : '-';

const DcaForm = ({
  input,
  onChange,
  onChangeLot,
  onAddLot,
  onRemoveLot,
  onSave,
  onReset,
  canSave,
}: DcaFormProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSave();
  };

  const currentTotal =
    input.currentAvgPrice !== null && input.currentQuantity !== null
      ? input.currentAvgPrice * input.currentQuantity
      : null;
  const currencySymbol = appConfig.currencySymbol;

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>종목명</span>
        <input
          type="text"
          value={input.symbol}
          placeholder="예) 삼성전자"
          onChange={(event) => onChange({ symbol: event.target.value })}
        />
      </label>

      <div className="field-group">
        <div className="form-field">
          <span>현재 평균단가</span>
          <input
            type="number"
            value={input.currentAvgPrice ?? ''}
            min={0}
            onChange={numberInput('currentAvgPrice', onChange)}
          />
        </div>
        <div className="form-field">
          <span>보유 수량</span>
          <input
            type="number"
            value={input.currentQuantity ?? ''}
            min={0}
            onChange={numberInput('currentQuantity', onChange)}
          />
        </div>
        <div className="form-field readonly">
          <span>현재 보유 총액</span>
          <div className="readonly-chip">
            {formatNumber(currentTotal)} {currencySymbol}
          </div>
        </div>
      </div>

      <div className="lot-header">
        <h3>추가 매수</h3>
        <button type="button" className="btn ghost" onClick={onAddLot}>
          + 행 추가
        </button>
      </div>

      {input.additionalLots.map((lot, index) => {
        const lotTotal =
          lot.price !== null && lot.quantity !== null ? lot.price * lot.quantity : null;
        return (
          <div className="lot-row" key={index}>
            <div className="form-field">
              <span>추가 단가</span>
              <input
                type="number"
                value={lot.price ?? ''}
                min={0}
                onChange={lotInput(index, 'price', onChangeLot)}
              />
            </div>
            <div className="form-field">
              <span>추가 수량</span>
              <input
                type="number"
                value={lot.quantity ?? ''}
                min={0}
                onChange={lotInput(index, 'quantity', onChangeLot)}
              />
            </div>
            <div className="form-field readonly">
              <span>추가 총액</span>
              <div className="readonly-chip">
                {formatNumber(lotTotal)} {currencySymbol}
              </div>
            </div>
            <div className="lot-actions">
              <button
                type="button"
                className="btn ghost"
                onClick={() => onRemoveLot(index)}
                aria-label="행 삭제"
              >
                삭제
              </button>
            </div>
          </div>
        );
      })}

      <div className="form-actions">
        <button type="submit" className="btn primary" disabled={!canSave}>
          저장
        </button>
        <button type="button" className="btn ghost" onClick={onReset}>
          새 계산
        </button>
      </div>
    </form>
  );
};

export default DcaForm;
