import { FormEvent, ChangeEvent } from 'react';
import type { DcaInput } from '../../features/dca/types';

interface DcaFormProps {
  input: DcaInput;
  onChange: (patch: Partial<DcaInput>) => void;
  onSubmit: () => void;
  onReset: () => void;
}

const numberInput =
  (key: keyof DcaInput, onChange: DcaFormProps['onChange']) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    const nextValue = raw === '' ? null : Number(raw);
    onChange({ [key]: nextValue });
  };

const DcaForm = ({ input, onChange, onSubmit, onReset }: DcaFormProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>현재 평균단가</span>
        <input
          type="number"
          value={input.currentAvgPrice ?? ''}
          min={0}
          onChange={numberInput('currentAvgPrice', onChange)}
        />
      </label>

      <label className="form-field">
        <span>보유 수량</span>
        <input
          type="number"
          value={input.currentQuantity ?? ''}
          min={0}
          onChange={numberInput('currentQuantity', onChange)}
        />
      </label>

      <label className="form-field">
        <span>시장가</span>
        <input
          type="number"
          value={input.marketPrice ?? ''}
          min={0}
          onChange={numberInput('marketPrice', onChange)}
        />
      </label>

      <label className="form-field">
        <span>목표 평균단가</span>
        <input
          type="number"
          value={input.targetAvgPrice ?? ''}
          min={0}
          onChange={numberInput('targetAvgPrice', onChange)}
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn primary">
          계산하기
        </button>
        <button type="button" className="btn ghost" onClick={onReset}>
          기본값으로 리셋
        </button>
      </div>
    </form>
  );
};

export default DcaForm;
