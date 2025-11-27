import { Badge } from '@toss/tds-mobile';
import { formatNumber, formatPercent } from '../../lib/numberFormat';
import type { DcaResult as DcaResultData } from '../../features/dca/types';

interface DcaResultProps {
  result: DcaResultData | null;
  currencySymbol: string;
}

const DcaResult = ({ result, currencySymbol }: DcaResultProps) => {
  if (!result) {
    return <p className="muted">필수 입력을 채우면 결과가 바로 계산됩니다.</p>;
  }

  const isGain = result.additionalReturn > 0;
  const badgeColor = isGain ? 'red' : 'blue';
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
        <Badge size="small" variant="fill" color={badgeColor}>
          {formatPercent(result.additionalReturn)}
        </Badge>
      </div>
    </div>
  );
};

export default DcaResult;
