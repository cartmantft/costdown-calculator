import { appConfig } from '../../config/appConfig';
import type { DcaResult as DcaResultData } from '../../features/dca/types';

interface DcaResultProps {
  result: DcaResultData | null;
}

const formatNumber = (value: number) =>
  Number.isFinite(value) ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-';

const formatPercent = (value: number) =>
  Number.isFinite(value)
    ? `${value > 0 ? '+' : ''}${(value * 100).toFixed(2)}%`
    : '-';

const DcaResult = ({ result }: DcaResultProps) => {
  if (!result) {
    return <p className="muted">필수 입력을 채우면 결과가 바로 계산됩니다.</p>;
  }

  const isGain = result.additionalReturn > 0;
  const badgeClass = isGain ? 'badge-positive' : 'badge-negative';
  const currencySymbol = appConfig.currencySymbol;

  return (
    <div className="result">
      <div className="result-row">
        <span>최종 평균단가</span>
        <strong>
          {formatNumber(result.finalAvgPrice)} {currencySymbol}
        </strong>
      </div>
      <div className="result-row">
        <span>최종 보유 수량</span>
        <strong>{formatNumber(result.finalQuantity)} 주</strong>
      </div>
      <div className="result-row">
        <span>현재 보유 총액</span>
        <strong>
          {formatNumber(result.currentTotalCost)} {currencySymbol}
        </strong>
      </div>
      <div className="result-row">
        <span>추가 매수 총액</span>
        <strong>
          {formatNumber(result.additionalTotalCost)} {currencySymbol}
        </strong>
      </div>
      <div className="result-row">
        <span>추가 매수 평균단가</span>
        <strong>
          {formatNumber(result.additionalAvgPrice)} {currencySymbol}
        </strong>
      </div>
      <div className="result-row">
        <span>추가 매수 후 손익률</span>
        <span className={`pill ${badgeClass}`}>{formatPercent(result.additionalReturn)}</span>
      </div>
    </div>
  );
};

export default DcaResult;
